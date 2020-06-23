package com.swithme.domain.student;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentTest {

    @Autowired
    private StudentRepository studentRepository;

    @Before
    public void setup(){
        studentRepository.save(Student.builder()
                .isSubscribing(true)
                .payDateTime("2020-05-01 00:00:00")
                .build());
    }

    @After
    public void cleanup(){
        studentRepository.deleteAll();
    }

    @Test
    public void checkSubscriptionTest() throws ParseException {
        Student student = studentRepository.findAll().get(0);

        assertThat(student.getIsSubscribing()).isTrue();

        if(student.getIsSubscribing()) student.checkSubscription();
        assertThat(student.getIsSubscribing()).isFalse();
    }
}
