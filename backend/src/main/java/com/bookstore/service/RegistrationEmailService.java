package com.bookstore.service;

import com.bookstore.domain.entity.UserEntity;
import com.bookstore.domain.repository.RegistrationEmailRepository;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class RegistrationEmailService {
    private static final Logger logger = LoggerFactory.getLogger(RegistrationEmailService.class);

    private final RegistrationEmailRepository registrationEmailRepository;
    private final JavaMailSender mailSender;
    private final String fromEmail;

    public RegistrationEmailService(
            RegistrationEmailRepository registrationEmailRepository,
            JavaMailSender mailSender,
            @Value("${app.mail.from:noreply@bookstore.local}") String fromEmail
    ) {
        this.registrationEmailRepository = registrationEmailRepository;
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
    }

    public void sendRegistrationSuccessEmail(UserEntity user) {
        sendSuccessMail(user.getEmail(), user.getFullName());
    }

    public void resendRegistrationSuccessEmail(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        UserEntity user = registrationEmailRepository.findByEmailAndEmailVerifiedAtIsNotNull(normalizedEmail)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng đã xác thực"));
        sendSuccessMail(user.getEmail(), user.getFullName());
    }

    private void sendSuccessMail(String email, String fullName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("BookStore - Đăng ký tài khoản thành công");
        message.setText(buildSuccessBody(fullName));

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            logger.warn("Cannot send register-success email to {}. reason={}", email, ex.getMessage());
        }
    }

    private String buildSuccessBody(String fullName) {
        String displayName = fullName == null || fullName.isBlank() ? "bạn" : fullName;
        return "Xin chào " + displayName + ",\n\n"
            + "Tài khoản BookStore của bạn đã được kích hoạt thành công.\n"
            + "Bây giờ bạn có thể đăng nhập và mua sắm trên hệ thống.\n\n"
            + "Trân trọng,\n"
                + "BookStore Team";
    }
}
