package com.bookstore.mapper;

import com.bookstore.domain.entity.CustomerTierEntity;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.dto.response.TierResponse;
import com.bookstore.dto.response.UserResponse;

public interface UserMapper {
    UserResponse toUserResponse(UserEntity user);

    TierResponse toTierResponse(CustomerTierEntity tier);
}
