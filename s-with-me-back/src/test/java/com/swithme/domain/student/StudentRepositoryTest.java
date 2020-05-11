package com.swithme.domain.student;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentRepositoryTest {

    @Autowired
    StudentRepository studentRepository;

    @After
    public void cleanup(){
        studentRepository.deleteAll();
    }

    @Test
    public void saveLoadStudent(){
        //given
        String id = "test id";
        String password = "test password";
        String name = "test name";
        String phoneNumber = "test phoneNumber";
        String birthDay = "test birthDay";
        short grade = 3;

        studentRepository.save(Student.builder()
                .id(id)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .birthDay(birthDay)
                .grade(grade)
                .build());

        //when
        List<Student> studentList = studentRepository.findAll();

        Student student = studentList.get(0);
        assertThat(student.getId()).isEqualTo(id);
        assertThat(student.getPassword()).isEqualTo(password);
        assertThat(student.getName()).isEqualTo(name);
        assertThat(student.getPhoneNumber()).isEqualTo(phoneNumber);
        assertThat(student.getBirthDay()).isEqualTo(birthDay);
        assertThat(student.getGrade()).isEqualTo(grade);
    }

}