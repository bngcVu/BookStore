package com.bookstore.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.bookstore.domain.entity.UserEntity;
import com.bookstore.domain.repository.RegistrationEmailRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

@ExtendWith(MockitoExtension.class)
class RegistrationEmailServiceTest {

    @Mock
    private RegistrationEmailRepository registrationEmailRepository;

    @Mock
    private JavaMailSender mailSender;

    @Test
    void resendRegistrationSuccessEmail_shouldNormalizeEmailAndSendMail() {
        RegistrationEmailService registrationEmailService =
            new RegistrationEmailService(registrationEmailRepository, mailSender, "noreply@bookstore.local");

        UserEntity user = new UserEntity();
        user.setEmail("demo@bookstore.vn");
        user.setFullName("Nguyen Van A");
        user.setEmailVerifiedAt(LocalDateTime.now());

        when(registrationEmailRepository.findByEmailAndEmailVerifiedAtIsNotNull("demo@bookstore.vn"))
                .thenReturn(Optional.of(user));

        registrationEmailService.resendRegistrationSuccessEmail("  Demo@BookStore.VN ");

        verify(registrationEmailRepository).findByEmailAndEmailVerifiedAtIsNotNull("demo@bookstore.vn");
        verify(mailSender).send(any(org.springframework.mail.SimpleMailMessage.class));
    }
}
