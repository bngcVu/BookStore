package com.bookstore.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "districts")
public class DistrictEntity {
    @Id
    @Column(name = "code", length = 10, nullable = false)
    private String code;

    @Column(name = "province_code", length = 10, nullable = false)
    private String provinceCode;

    @Column(name = "name", length = 100, nullable = false)
    private String name;
}
