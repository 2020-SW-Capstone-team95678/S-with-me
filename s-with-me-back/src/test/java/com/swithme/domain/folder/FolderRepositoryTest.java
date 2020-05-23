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
                .studentId(1)
                .userId("test id")
                .password("11")
                .name("11")
                .phoneNumber("11")
                .birthday("11")
                .grade((short)4)
                .build());
        student = studentRepository.findAll().get(0);

        folderRepository.save(Folder.builder()
                .student(student)
                .build());
    }

    @After
    public void cleanup(){
        folderRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void findByStudentTest(){
        Folder folder = folderRepository.findByStudent(student).get(0);
        assertThat(folder.getStudent().getStudentId()).isEqualTo(student.getStudentId());
    }
}
