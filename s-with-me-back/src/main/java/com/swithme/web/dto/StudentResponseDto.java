package com.swithme.web.dto;

import com.swithme.domain.student.Student;
import lombok.Getter;

@Getter
public class StudentResponseDto {
    private Long studentId;
    private String userId;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthDay;
    private short grade;

    public StudentResponseDto(Student entity){
        this.studentId = entity.getStudentId();
        this.userId = entity.getUserId();
        this.password = entity.getPassword();
        this.name = entity.getName();
        this.phoneNumber = entity.getPhoneNumber();
        this.birthDay = entity.getPhoneNumber();
        this.grade = entity.getGrade();
    }
}
