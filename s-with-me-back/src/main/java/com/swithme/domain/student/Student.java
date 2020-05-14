package com.swithme.domain.student;

import lombok.AccessLevel;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "studentId")
    private Long studentId;

    @Column(length = 20, nullable = false)
    private String id;

    @Column(length = 20, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 20 , nullable = false)
    private String name;

    @Column(length = 20 , nullable = false)
    private String phoneNumber;

    @Column(length = 20 , nullable = false)
    private String birthday;

    @Column(nullable = false)
    private Short grade;

    @Builder
    public Student(Long studentId,String id, String email, String password , String name , String phoneNumber , String birthday , Short grade) {
        this.studentId = studentId;
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
    }
}