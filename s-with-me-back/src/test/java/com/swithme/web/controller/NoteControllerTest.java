package com.swithme.web.controller;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.NoteSaveRequestDto;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class NoteControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private MyProblemRepository myProblemRepository;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private FolderRepository folderRepository;

    private Student student;
    private MyProblem myProblem;

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
        myBookRepository.save(MyBook.builder()
                .folder(folderRepository.findAll().get(0))
                .build());
        problemRepository.save(new Problem());
        myProblemRepository.save(MyProblem.builder()
                .myBook(myBookRepository.findAll().get(0))
                .problem(problemRepository.findAll().get(0))
                .build());

        myProblem = myProblemRepository.findAll().get(0);
    }

    @After
    public void cleanup(){
        noteRepository.deleteAll();
        myProblemRepository.deleteAll();
        myBookRepository.deleteAll();
        folderRepository.deleteAll();
        problemRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void saveNoteTest(){
        assertThat(noteRepository.findAll()).isEmpty();
        NoteSaveRequestDto requestDto = NoteSaveRequestDto.builder()
                .myProblemId(myProblem.getMyProblemId())
                .addedDateTime(12345L)
                .build();

        HttpEntity<NoteSaveRequestDto> requestEntity = new HttpEntity<>(requestDto);

        String url = "http://localhost:" + port + "/student/note";

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(noteRepository.findAll()).isNotEmpty();
    }

    @Test
    public void getNoteListTest(){
        noteRepository.save(Note.builder()
                .student(student)
                .myProblem(myProblem)
                .build());

        String url = "http://localhost:" + port + "/student/note?studentId=" + student.getStudentId();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void deleteNoteTest(){
        noteRepository.save(new Note());
        assertThat(noteRepository.findAll()).isNotEmpty();

        Note note = noteRepository.findAll().get(0);


        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/student/note/" + note.getNoteId();

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(noteRepository.findAll()).isEmpty();
    }
}
