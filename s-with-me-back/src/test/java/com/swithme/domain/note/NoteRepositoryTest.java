package com.swithme.domain.note;

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
public class NoteRepositoryTest {

    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private StudentRepository studentRepository;

    private Long addedDateTime;

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
        Student student = studentRepository.findAll().get(0);
        addedDateTime = 12345L;

        noteRepository.save(Note.builder()
                .student(student)
                .addedDateTime(addedDateTime)
                .build());
    }

    @After
    public void cleanup(){
        noteRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void findByStudent(){
        Student student = studentRepository.findAll().get(0);
        Note note = noteRepository.findByStudent(student).get(0);

        assertThat(note.getAddedDateTime()).isEqualTo(addedDateTime);
    }
}
