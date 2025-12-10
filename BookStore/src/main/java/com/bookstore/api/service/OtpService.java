package com.bookstore.api.service;

import com.bookstore.api.entity.OtpCode;
import com.bookstore.api.repository.OtpCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {
    private final OtpCodeRepository otpRepo;
    private final JavaMailSender mailSender;

    public OtpService(OtpCodeRepository otpRepo, JavaMailSender mailSender) {
        this.otpRepo = otpRepo;
        this.mailSender = mailSender;
    }

    @Transactional
    public void sendRegisterOtp(String email) {
        String code = String.format("%06d", new Random().nextInt(1_000_000));
        OtpCode otp = OtpCode.builder()
                .email(email)
                .code(code)
                .type(OtpCode.Type.register)
                .expiresAt(LocalDateTime.now().plusMinutes(10))
                .isUsed(0)
                .createdAt(LocalDateTime.now())
                .build();
        otpRepo.save(otp);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Your verification code");
        msg.setText("Mã OTP: " + code + " (hết hạn sau 10 phút)");
        mailSender.send(msg);
    }
}
