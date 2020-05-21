package com.swithme.web.dto;

import com.swithme.domain.student.Student;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class StudentCreateDto {
    private int studentId;
    private String userId;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthday;
    private Short grade;

    //private LocalDateTime createdDate;
    //private LocalDateTime modifiedDate;

    public Student toEntity(){
        return Student.builder()

                .studentId(studentId)
                .userId(userId)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .birthday(birthday)
                .grade(grade)
                .build();
    }

    @Builder
    public StudentCreateDto(int studentId, String userId, String password, String name , String phoneNumber , String birthday , Short grade) {
        this.studentId = studentId;
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
    }
}