package com.bookstore.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "security.jwt")
public class AppProperties {
    private String secret;
    private int accessTokenExpMin;
    private int refreshTokenExpDays;

    public String getSecret() { 
        return secret; 
    }

    public void setSecret(String secret) { 
        this.secret = secret; 
    }
    public int getAccessTokenExpMin() { 
        return accessTokenExpMin; 
    }
    public void setAccessTokenExpMin(int accessTokenExpMin) { 
        this.accessTokenExpMin = accessTokenExpMin; 
    }
    public int getRefreshTokenExpDays() { 
        return refreshTokenExpDays; 
    }
    public void setRefreshTokenExpDays(int refreshTokenExpDays) { 
        this.refreshTokenExpDays = refreshTokenExpDays; 
    }
}
