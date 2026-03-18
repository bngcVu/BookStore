package com.bookstore.mapper;

import com.bookstore.domain.entity.CustomerTierEntity;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.dto.response.TierResponse;
import com.bookstore.dto.response.UserResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-18T11:48:36+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toUserResponse(UserEntity user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setTier( toTierResponse( user.getTier() ) );
        userResponse.setId( user.getId() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setFullName( user.getFullName() );
        userResponse.setAvatarUrl( user.getAvatarUrl() );
        userResponse.setRewardPoints( user.getRewardPoints() );
        userResponse.setTotalSpent( user.getTotalSpent() );

        return userResponse;
    }

    @Override
    public TierResponse toTierResponse(CustomerTierEntity tier) {
        if ( tier == null ) {
            return null;
        }

        TierResponse tierResponse = new TierResponse();

        tierResponse.setId( tier.getId() );
        tierResponse.setName( tier.getName() );
        if ( tier.getDiscountPercent() != null ) {
            tierResponse.setDiscountPercent( tier.getDiscountPercent().intValue() );
        }
        tierResponse.setMinSpent( tier.getMinSpent() );

        return tierResponse;
    }
}
