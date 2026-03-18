package com.bookstore.service;

import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.OtpType;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.domain.repository.OtpCodeRepository;
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

@Service
public class OtpService {
    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);
    private static final int OTP_LENGTH = 6;
    private static final int OTP_TTL_MINUTES = 5;

    private final OtpCodeRepository otpCodeRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final boolean sendEmailEnabled;
    private final Random random = new Random();

    public OtpService(
            OtpCodeRepository otpCodeRepository,
            UserRepository userRepository,
            JavaMailSender mailSender,
            @Value("${app.otp.send-email:false}") boolean sendEmailEnabled
    ) {
        this.otpCodeRepository = otpCodeRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.sendEmailEnabled = sendEmailEnabled;
    }

    @Transactional
    public void sendRegisterOtp(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        createAndSendOtp(user, email, OtpType.register);
    }

    @Transactional
    public void sendForgotPasswordOtp(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> createAndSendOtp(user, email, OtpType.reset_password));
    }

    public OtpCodeEntity validateOtp(String email, String code, OtpType type) {
        OtpCodeEntity otp = otpCodeRepository
                .findTopByEmailAndTypeAndIsUsedFalseOrderByCreatedAtDesc(email, type)
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

    private void createAndSendOtp(UserEntity user, String email, OtpType type) {
        String code = generateOtp();
        OtpCodeEntity otp = new OtpCodeEntity();
        otp.setUser(user);
        otp.setEmail(email);
        otp.setCode(code);
        otp.setType(type);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_TTL_MINUTES));
        otp.setIsUsed(false);
        otpCodeRepository.save(otp);

        sendEmail(email, type, code);
    }

    private String generateOtp() {
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
        message.setSubject("BookStore OTP - " + type.name());
        message.setText("Your OTP code is: " + code + ". It expires in " + OTP_TTL_MINUTES + " minutes.");
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
