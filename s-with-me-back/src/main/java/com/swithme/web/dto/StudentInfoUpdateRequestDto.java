package com.swithme.web.dto;

import lombok.*;

@Getter
@NoArgsConstructor
public class StudentInfoUpdateRequestDto {
    private String phoneNumber;
    private Short grade;

    @Builder
    public StudentInfoUpdateRequestDto(String phoneNumber, short grade) {
        this.phoneNumber = phoneNumber;
        this.grade = grade;

    }
}
