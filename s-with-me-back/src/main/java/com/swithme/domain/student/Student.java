package com.swithme.domain.student;

import lombok.AccessLevel;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "studentId")
    private int studentId;

    @Column(length = 20, nullable = false)
    private String userId;


    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "name", length = 20 , nullable = false)
    private String name;

    @Column(name = "phoneNumber", length = 20 , nullable = false)
    private String phoneNumber;

    @Column(name = "birthday", length = 20 , nullable = false)
    private String birthday;

    @Column(name = "grade", nullable = false)
    private Short grade;

    @Builder

    public Student(int studentId, String userId, String password , String name , String phoneNumber , String birthday , Short grade) {
        this.studentId = studentId;
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
    }
}