package com.bookstore.service;

import com.bookstore.domain.repository.OtpCodeRepository;
import java.time.LocalDateTime;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class OtpCleanupJob {
    private final OtpCodeRepository otpCodeRepository;

    public OtpCleanupJob(OtpCodeRepository otpCodeRepository) {
        this.otpCodeRepository = otpCodeRepository;
    }

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void cleanupExpiredOtps() {
        otpCodeRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
