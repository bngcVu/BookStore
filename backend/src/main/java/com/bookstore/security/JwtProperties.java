package com.bookstore.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.jwt")
public class JwtProperties {
    private String issuer;
    private String audience;
    private String privateKeyBase64;
    private String publicKeyBase64;
    private long accessTokenExpMin = 15;
    private long refreshTokenExpDays = 7;

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getPrivateKeyBase64() {
        return privateKeyBase64;
    }

    public void setPrivateKeyBase64(String privateKeyBase64) {
        this.privateKeyBase64 = privateKeyBase64;
    }

    public String getPublicKeyBase64() {
        return publicKeyBase64;
    }

    public void setPublicKeyBase64(String publicKeyBase64) {
        this.publicKeyBase64 = publicKeyBase64;
    }

    public long getAccessTokenExpMin() {
        return accessTokenExpMin;
    }

    public void setAccessTokenExpMin(long accessTokenExpMin) {
        this.accessTokenExpMin = accessTokenExpMin;
    }

    public long getRefreshTokenExpDays() {
        return refreshTokenExpDays;
    }

    public void setRefreshTokenExpDays(long refreshTokenExpDays) {
        this.refreshTokenExpDays = refreshTokenExpDays;
    }
}
