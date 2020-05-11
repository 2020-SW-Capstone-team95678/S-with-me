package com.swithme.domain.folder;

import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FolderRepositoryTest {

    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Before
    public void setup(){
        studentRepository.save(Student.builder()
                .id("id")
                .password("password")
                .birthDay("2020-02-02")
                .phoneNumber("123-456-7890")
                .name("name")
                .grade((short)4)
                .build());
    }

    @After
    public void cleanup(){
        folderRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void saveLoadFolder(){
        List<Student> studentList = studentRepository.findAll();
        Student student = studentList.get(0);

        String folderName = "test folder name";

        folderRepository.save(Folder.builder()
                .student(student)
                .folderName(folderName)
                .build());

        List<Folder> folderList = folderRepository.findAll();
        Folder folder = folderList.get(0);

        assertThat(folder.getStudent().getStudentId()).isEqualTo(student.getStudentId());
        assertThat(folder.getFolderName()).isEqualTo(folderName);
    }
}
