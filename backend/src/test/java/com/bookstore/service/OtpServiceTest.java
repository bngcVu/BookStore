package com.bookstore.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.OtpType;
import com.bookstore.domain.entity.RegistrationPendingEntity;
import com.bookstore.domain.repository.OtpCodeRepository;
import com.bookstore.domain.repository.RegistrationPendingRepository;
import com.bookstore.domain.repository.UserRepository;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

@ExtendWith(MockitoExtension.class)
class OtpServiceTest {

    @Mock
    private OtpCodeRepository otpCodeRepository;

    @Mock
    private RegistrationPendingRepository registrationPendingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JavaMailSender mailSender;

    private OtpService otpService;

    @BeforeEach
    void setUp() {
        otpService = new OtpService(
                otpCodeRepository,
                registrationPendingRepository,
                userRepository,
                mailSender,
                false,
                5,
                60,
                5,
                ""
        );
    }

    @Test
    void sendRegisterOtp_shouldRejectWhenCooldownNotReached() {
        String email = "demo@bookstore.vn";
        RegistrationPendingEntity pending = new RegistrationPendingEntity();
        pending.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        OtpCodeEntity lastOtp = new OtpCodeEntity();
        lastOtp.setCreatedAt(LocalDateTime.now().minusSeconds(30));

        when(userRepository.existsByEmail(email)).thenReturn(false);
        when(registrationPendingRepository.findByEmail(email)).thenReturn(Optional.of(pending));
        when(otpCodeRepository.findTopByEmailAndTypeOrderByCreatedAtDesc(email, OtpType.register))
                .thenReturn(Optional.of(lastOtp));

        assertThatThrownBy(() -> otpService.sendRegisterOtp(email))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.OTP_RATE_LIMIT);
    }

    @Test
    void sendRegisterOtp_shouldRejectWhenDailyLimitReached() {
        String email = "demo@bookstore.vn";
        RegistrationPendingEntity pending = new RegistrationPendingEntity();
        pending.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        OtpCodeEntity lastOtp = new OtpCodeEntity();
        lastOtp.setCreatedAt(LocalDateTime.now().minusMinutes(5));

        when(userRepository.existsByEmail(email)).thenReturn(false);
        when(registrationPendingRepository.findByEmail(email)).thenReturn(Optional.of(pending));
        when(otpCodeRepository.findTopByEmailAndTypeOrderByCreatedAtDesc(email, OtpType.register))
                .thenReturn(Optional.of(lastOtp));
        when(otpCodeRepository.countByEmailAndTypeAndCreatedAtAfter(any(), any(), any())).thenReturn(5L);

        assertThatThrownBy(() -> otpService.sendRegisterOtp(email))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.OTP_RATE_LIMIT);
    }

    @Test
    void sendRegisterOtp_shouldCreateOtpWhenPolicyPasses() {
        String email = "demo@bookstore.vn";
        RegistrationPendingEntity pending = new RegistrationPendingEntity();
        pending.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        when(userRepository.existsByEmail(email)).thenReturn(false);
        when(registrationPendingRepository.findByEmail(email)).thenReturn(Optional.of(pending));
        when(otpCodeRepository.findTopByEmailAndTypeOrderByCreatedAtDesc(email, OtpType.register))
                .thenReturn(Optional.empty());
        when(otpCodeRepository.countByEmailAndTypeAndCreatedAtAfter(any(), any(), any())).thenReturn(0L);

        otpService.sendRegisterOtp(email);

        verify(otpCodeRepository).save(any(OtpCodeEntity.class));
    }
}
