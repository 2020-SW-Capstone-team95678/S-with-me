package com.swithme.domain.swithme;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stdId;

    private String id;
    private String password;
    private String name;
    private String phoneNumber;
    private String birthDay;
    private short grade;

    @Builder
    public Student(String id, String password, String name, String phoneNumber, String birthDay, short grade){
        this.id = id;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthDay = birthDay;
        this.grade = grade;
    }
}