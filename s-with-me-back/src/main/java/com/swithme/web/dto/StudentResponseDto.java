package com.swithme.web.dto;

import com.swithme.domain.student.Student;
import lombok.Getter;

@Getter
public class StudentResponseDto {
    private int studentId;
    private String id;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthDay;
    private short grade;

    public StudentResponseDto(Student entity){
        this.studentId = entity.getStudentId();
        this.id = entity.getId();
        this.password = entity.getPassword();
        this.name = entity.getName();
        this.phoneNumber = entity.getPhoneNumber();
        this.birthDay = entity.getPhoneNumber();
        this.grade = entity.getGrade();
    }
}
