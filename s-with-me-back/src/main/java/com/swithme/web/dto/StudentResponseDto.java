package com.swithme.web.dto;

import com.swithme.domain.student.Student;
import lombok.Getter;

@Getter
public class StudentResponseDto {

    private int studentId;
    private String userId;
    private String name;
    private String phoneNumber;
    private String birthday;
    private short grade;
    private Boolean isSubscribing;
    private String payDateTime;

    public StudentResponseDto(Student entity){
        this.studentId = entity.getStudentId();
        this.userId = entity.getUserId();
        this.name = entity.getName();
        this.phoneNumber = entity.getPhoneNumber();
        this.birthday = entity.getPhoneNumber();
        this.grade = entity.getGrade();
        this.isSubscribing = entity.getIsSubscribing();
        this.payDateTime = entity.getPayDateTime();
    }
}
