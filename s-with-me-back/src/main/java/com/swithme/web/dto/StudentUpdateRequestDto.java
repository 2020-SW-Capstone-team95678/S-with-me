package com.swithme.web.dto;

import lombok.*;

@Getter
@NoArgsConstructor
public class StudentUpdateRequestDto {
    private String phoneNumber;
    private Short grade;

    @Builder
    public StudentUpdateRequestDto( String phoneNumber,short grade) {
        this.phoneNumber = phoneNumber;
        this.grade = grade;

    }
}
