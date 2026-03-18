package com.bookstore.dto.request;

import com.bookstore.domain.entity.Gender;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    @Size(max = 100)
    private String fullName;

    @Size(max = 500)
    private String avatarUrl;

    private LocalDate dateOfBirth;

    private Gender gender;
}
