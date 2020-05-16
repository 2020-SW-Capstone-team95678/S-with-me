package com.swithme.web.dto;

import com.swithme.domain.student.Student;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class StudentDto {
    private String userId;
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthday;
    private Short grade;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public Student toEntity(){
        return Student.builder()
                .userId(userId)
                .email(email)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .birthday(birthday)
                .grade(grade)
                .build();
    }

    @Builder
    public StudentDto(String userId, String email, String password, String name , String phoneNumber ,String birthday , Short grade) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
    }
}