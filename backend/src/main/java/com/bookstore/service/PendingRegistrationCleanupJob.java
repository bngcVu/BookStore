package com.bookstore.service;

import com.bookstore.domain.repository.RegistrationPendingRepository;
import java.time.LocalDateTime;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class PendingRegistrationCleanupJob {
    private final RegistrationPendingRepository registrationPendingRepository;

    public PendingRegistrationCleanupJob(RegistrationPendingRepository registrationPendingRepository) {
        this.registrationPendingRepository = registrationPendingRepository;
    }

    @Scheduled(cron = "0 */5 * * * *")
    @Transactional
    public void cleanupExpiredPendingRegistrations() {
        registrationPendingRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
