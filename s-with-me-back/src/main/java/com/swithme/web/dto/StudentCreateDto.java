package com.swithme.web.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class StudentCreateDto {
    int studentId;
    String userId;
    String name;
    String password;
    String phoneNumber;
    String birthday;
    short grade;

    @Builder
    public StudentCreateDto(int studentId, String userId, String name, String password,
                            String phoneNumber, String birthday, short grade) {
        this.studentId = studentId;
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
    }
}
