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

    private Student student;

    @Before
    public void setup(){
        studentRepository.save(Student.builder()
                .studentId(1L)
                .userId("test id")
                .email("11")
                .password("11")
                .name("11")
                .phoneNumber("11")
                .birthday("11")
                .grade((short)4)
                .build());

        List<Student> studentList = studentRepository.findAll();
        student = studentList.get(0);

        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("test folder name 1")
                .build());

        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("test folder name 2")
                .build());
    }

    @After
    public void cleanup(){
        folderRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void findByStudentTest(){
        List<Folder> folderList = folderRepository.findByStudent(student);
        Folder folder1 = folderList.get(0);
        Folder folder2 = folderList.get(1);

        assertThat(folder1.getStudent().getStudentId()).isEqualTo(student.getStudentId());
        assertThat(folder1.getFolderName()).isEqualTo("test folder name 1");
        assertThat(folder2.getFolderName()).isEqualTo("test folder name 2");
    }
}
