package com.bookstore.service;

import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.OtpType;
import com.bookstore.domain.entity.RegistrationPendingEntity;
import com.bookstore.domain.repository.OtpCodeRepository;
import com.bookstore.domain.repository.RegistrationPendingRepository;
import com.bookstore.domain.repository.UserRepository;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import java.time.LocalDateTime;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class OtpService {
    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);
    private static final int OTP_LENGTH = 6;

    private final OtpCodeRepository otpCodeRepository;
    private final RegistrationPendingRepository registrationPendingRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final boolean sendEmailEnabled;
    private final int otpTtlMinutes;
    private final int resendCooldownSeconds;
    private final int maxResendPerDay;
    private final String fixedOtpCode;
    private final Random random = new Random();

    public OtpService(
            OtpCodeRepository otpCodeRepository,
            RegistrationPendingRepository registrationPendingRepository,
            UserRepository userRepository,
            JavaMailSender mailSender,
            @Value("${app.otp.send-email:false}") boolean sendEmailEnabled,
            @Value("${app.otp.ttl-minutes:5}") int otpTtlMinutes,
                @Value("${app.otp.resend-cooldown-seconds:60}") int resendCooldownSeconds,
                @Value("${app.otp.max-resend-per-day:5}") int maxResendPerDay,
            @Value("${app.otp.fixed-code:}") String fixedOtpCode
    ) {
        this.otpCodeRepository = otpCodeRepository;
        this.registrationPendingRepository = registrationPendingRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.sendEmailEnabled = sendEmailEnabled;
        this.otpTtlMinutes = otpTtlMinutes;
        this.resendCooldownSeconds = resendCooldownSeconds;
        this.maxResendPerDay = maxResendPerDay;
        this.fixedOtpCode = fixedOtpCode;
    }

    @Transactional
    public void sendRegisterOtp(String email) {
        String normalizedEmail = normalizeEmail(email);
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS, "Email is already verified");
        }

        RegistrationPendingEntity pending = registrationPendingRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "No pending registration found"));

        enforceOtpSendPolicy(normalizedEmail, OtpType.register);
        createAndSendOtp(normalizedEmail, OtpType.register, pending.getExpiresAt());
    }

    @Transactional
    public void sendForgotPasswordOtp(String email) {
        String normalizedEmail = normalizeEmail(email);
        userRepository.findByEmail(normalizedEmail)
            .ifPresent(user -> {
                enforceOtpSendPolicy(normalizedEmail, OtpType.reset_password);
                createAndSendOtp(normalizedEmail, OtpType.reset_password, LocalDateTime.now().plusMinutes(otpTtlMinutes));
            });
    }

    public OtpCodeEntity validateOtp(String email, String code, OtpType type) {
        String normalizedEmail = normalizeEmail(email);
        OtpCodeEntity otp = otpCodeRepository
                .findTopByEmailAndTypeAndIsUsedFalseOrderByCreatedAtDesc(normalizedEmail, type)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_OTP));

        if (otp.getExpiresAt() != null && otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }

        if (!otp.getCode().equals(code)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        return otp;
    }

    @Transactional
    public void markUsed(OtpCodeEntity otp) {
        otp.setIsUsed(true);
        otpCodeRepository.save(otp);
    }

    private void createAndSendOtp(String email, OtpType type, LocalDateTime expiresAt) {
        String code = generateOtp();
        OtpCodeEntity otp = new OtpCodeEntity();
        otp.setEmail(email);
        otp.setCode(code);
        otp.setType(type);
        otp.setExpiresAt(expiresAt);
        otp.setIsUsed(false);
        otpCodeRepository.save(otp);

        sendEmail(email, type, code);
    }

    private void enforceOtpSendPolicy(String email, OtpType type) {
        LocalDateTime now = LocalDateTime.now();

        otpCodeRepository.findTopByEmailAndTypeOrderByCreatedAtDesc(email, type).ifPresent(lastOtp -> {
            if (lastOtp.getCreatedAt() != null &&
                    lastOtp.getCreatedAt().plusSeconds(resendCooldownSeconds).isAfter(now)) {
                throw new AppException(
                        ErrorCode.OTP_RATE_LIMIT,
                        "Please wait before requesting another OTP"
                );
            }
        });

        LocalDateTime dayStart = now.toLocalDate().atStartOfDay();
        long sentToday = otpCodeRepository.countByEmailAndTypeAndCreatedAtAfter(email, type, dayStart);
        if (sentToday >= maxResendPerDay) {
            throw new AppException(
                    ErrorCode.OTP_RATE_LIMIT,
                    "You have reached the daily OTP resend limit"
            );
        }
    }

    private String normalizeEmail(String email) {
        if (!StringUtils.hasText(email)) {
            return "";
        }
        return email.trim().toLowerCase();
    }

    private String generateOtp() {
        if (fixedOtpCode != null && !fixedOtpCode.isBlank()) {
            return fixedOtpCode;
        }
        int bound = (int) Math.pow(10, OTP_LENGTH);
        int number = random.nextInt(bound - bound / 10) + bound / 10;
        return String.valueOf(number);
    }

    private void sendEmail(String email, OtpType type, String code) {
        if (!sendEmailEnabled) {
            logger.info("OTP generated for local testing: email={} type={} otpCode={}", email, type, code);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("BookStore - Mã OTP " + type.name());
        message.setText("Mã OTP của bạn là: " + code + ". Mã sẽ hết hạn sau " + otpTtlMinutes + " phút.");
        try {
            mailSender.send(message);
        } catch (MailException ex) {
            logger.warn(
                    "OTP email send failed for email={} type={}. Continue for local testing. otpCode={}. reason={}",
                    email,
                    type,
                    code,
                    ex.getMessage()
            );
        }
    }
}
