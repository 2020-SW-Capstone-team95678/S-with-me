package com.swithme.web.dto;

import com.swithme.domain.student.Student;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class StudentDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthdate;
    private Short grade;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public Student toEntity(){
        return Student.builder()
                .id(id)
                .email(email)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .birthdate(birthdate)
                .grade(grade)
                .build();
    }

    @Builder
    public StudentDto(Long id, String email, String password, String name , String phoneNumber ,String birthdate , Short grade) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthdate = birthdate;
        this.grade = grade;
    }
}