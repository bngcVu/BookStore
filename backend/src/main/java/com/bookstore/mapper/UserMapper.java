package com.bookstore.mapper;

import com.bookstore.domain.entity.CustomerTierEntity;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.dto.response.TierResponse;
import com.bookstore.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "tier", source = "tier")
    UserResponse toUserResponse(UserEntity user);

    TierResponse toTierResponse(CustomerTierEntity tier);
}
