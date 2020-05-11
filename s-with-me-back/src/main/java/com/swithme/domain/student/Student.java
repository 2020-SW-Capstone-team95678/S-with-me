package com.swithme.domain.student;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studentId")
    private int studentId;

    @Column(name = "id")
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "birthday")
    private String birthDay;

    @Column(name = "grade")
    private short grade;

    @Builder
    public Student(String id, String password, String name, String phoneNumber,
                   String birthDay, short grade){
        this.id = id;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthDay = birthDay;
        this.grade = grade;
    }
}