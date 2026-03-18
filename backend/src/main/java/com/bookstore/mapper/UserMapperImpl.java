package com.bookstore.mapper;

import com.bookstore.domain.entity.CustomerTierEntity;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.dto.response.TierResponse;
import com.bookstore.dto.response.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapperImpl implements UserMapper {
    @Override
    public UserResponse toUserResponse(UserEntity user) {
        if (user == null) {
            return null;
        }

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setTier(toTierResponse(user.getTier()));
        response.setRewardPoints(user.getRewardPoints());
        response.setTotalSpent(user.getTotalSpent());
        return response;
    }

    @Override
    public TierResponse toTierResponse(CustomerTierEntity tier) {
        if (tier == null) {
            return null;
        }

        TierResponse response = new TierResponse();
        response.setId(tier.getId());
        response.setName(tier.getName());
        response.setMinSpent(tier.getMinSpent());
        response.setDiscountPercent(tier.getDiscountPercent() == null ? null : tier.getDiscountPercent().intValue());
        return response;
    }
}
