package com.bookstore.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class JwtUtil {
    private final JwtProperties jwtProperties;

    private PrivateKey privateKey;
    private PublicKey publicKey;

    public JwtUtil(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    @PostConstruct
    void init() {
        KeyPair keyPair = loadOrGenerateKeyPair();
        this.privateKey = keyPair.getPrivate();
        this.publicKey = keyPair.getPublic();
    }

    public String generateAccessToken(String subject, Map<String, Object> customClaims) {
        Instant now = Instant.now();
        Instant exp = now.plus(jwtProperties.getAccessTokenExpMin(), ChronoUnit.MINUTES);

        return Jwts.builder()
                .subject(subject)
                .claims(customClaims)
                .issuer(jwtProperties.getIssuer())
                .audience().add(jwtProperties.getAudience()).and()
                .id(UUID.randomUUID().toString())
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(privateKey, Jwts.SIG.RS256)
                .compact();
    }

    public String generateRefreshToken(String subject) {
        Instant now = Instant.now();
        Instant exp = now.plus(jwtProperties.getRefreshTokenExpDays(), ChronoUnit.DAYS);

        return Jwts.builder()
                .subject(subject)
                .issuer(jwtProperties.getIssuer())
                .audience().add(jwtProperties.getAudience()).and()
                .id(UUID.randomUUID().toString())
                .claim("type", "refresh")
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(privateKey, Jwts.SIG.RS256)
                .compact();
    }

    public Claims parseAndValidate(String token) {
        Jws<Claims> jws = Jwts.parser()
                .verifyWith(publicKey)
                .requireIssuer(jwtProperties.getIssuer())
                .build()
                .parseSignedClaims(token);

        Claims claims = jws.getPayload();
        if (claims.getAudience() == null || !claims.getAudience().contains(jwtProperties.getAudience())) {
            throw new IllegalArgumentException("Invalid token audience");
        }
        return claims;
    }

    public long getRefreshTokenExpDays() {
        return jwtProperties.getRefreshTokenExpDays();
    }

    private KeyPair loadOrGenerateKeyPair() {
        try {
            if (!StringUtils.hasText(jwtProperties.getPrivateKeyBase64())
                    || !StringUtils.hasText(jwtProperties.getPublicKeyBase64())) {
                throw new IllegalStateException("SECURITY_JWT_PRIVATE_KEY_BASE64 và SECURITY_JWT_PUBLIC_KEY_BASE64 là bắt buộc.");
            }

            byte[] privateBytes = Base64.getDecoder().decode(jwtProperties.getPrivateKeyBase64());
            byte[] publicBytes = Base64.getDecoder().decode(jwtProperties.getPublicKeyBase64());

            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PrivateKey loadedPrivateKey = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(privateBytes));
            PublicKey loadedPublicKey = keyFactory.generatePublic(new X509EncodedKeySpec(publicBytes));
            return new KeyPair(loadedPublicKey, loadedPrivateKey);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to initialize JWT keypair", ex);
        }
    }
}
