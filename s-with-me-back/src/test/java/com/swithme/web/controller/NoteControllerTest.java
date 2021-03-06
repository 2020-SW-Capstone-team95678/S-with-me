package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
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
import com.swithme.web.dto.NoteCreateDto;
import com.swithme.web.dto.NoteUpdateRequestDto;
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

import java.sql.SQLException;

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
    @Autowired
    private BookRepository bookRepository;


    private Student student;
    private MyProblem myProblem;
    private Folder folder;
    private Book book;

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
        folder = folderRepository.findAll().get(0);

        bookRepository.save(Book.builder()
                .subject("국어")
                .build());
        book = bookRepository.findAll().get(0);

        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .book(book)
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
        bookRepository.deleteAll();
        folderRepository.deleteAll();
        problemRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void saveNoteTest(){
        assertThat(noteRepository.findAll()).isEmpty();
        NoteCreateDto requestDto = NoteCreateDto.builder()
                .myProblemId(myProblem.getMyProblemId())
                .addedDateTime(12345L)
                .build();

        HttpEntity<NoteCreateDto> requestEntity = new HttpEntity<>(requestDto);
        String url = "http://localhost:" + port + "/student/note";
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(noteRepository.findAll()).isNotEmpty();
    }

    @Test
    public void getNoteListTest(){
        for(int i =0; i < 3; i++) {
            noteRepository.save(Note.builder()
                    .student(student)
                    .myProblem(myProblem)
                    .addedDateTime(12345L)
                    .build());
        }

        String url = "http://localhost:" + port + "/student/" + student.getStudentId() + "/note?page=" + 1;
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getNoteListFilteredByFolderTest(){
        for(int i = 0; i < 3; i++){
            noteRepository.save(Note.builder()
                    .student(student)
                    .myProblem(myProblem)
                    .addedDateTime(12345L)
                    .build());
        }

        String url = "http://localhost:" + port + "/student/" + student.getStudentId()
                + "/note/folder-filter?folderId=" + folder.getFolderId() + "&page=1";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getNoteListFilteredBySubjectTest(){
        for(int i = 0; i < 3; i++){
            noteRepository.save(Note.builder()
                    .student(student)
                    .myProblem(myProblem)
                    .addedDateTime(12345L)
                    .build());
        }

        String url = "http://localhost:" + port + "/student/" + student.getStudentId()
                + "/note/subject-filter?subject=" + book.getSubject() + "&page=1";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void deleteNoteTest(){
        noteRepository.save(Note.builder()
                .myProblem(myProblem)
                .build());
        assertThat(noteRepository.findAll()).isNotEmpty();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/student/note?myProblemId=" + myProblem.getMyProblemId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(noteRepository.findAll()).isEmpty();
    }

    @Test
    public void updateNoteTest() throws SQLException {
        noteRepository.save(Note.builder()
                .addedDateTime(12345L)
                .myProblem(myProblem)
                .build());
        Note note = noteRepository.findAll().get(0);
        long expectedAddedDateTime = 54321L;

        String url = "http://localhost:" + port + "/student/note/" + note.getNoteId();

        NoteUpdateRequestDto requestDto = NoteUpdateRequestDto.builder()
                .solvedDateTime(expectedAddedDateTime)
                .isRight(true)
                .myAnswer("test answer")
                .linkSolutionId(null)
                .imageSolution(null)
                .textSolution("test solution")
                .handSolution(null)
                .solutionType("text")
                .build();


        HttpEntity<NoteUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        Note updatedNote = noteRepository.findAll().get(0);
        myProblem = myProblemRepository.findAll().get(0);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(updatedNote.getAddedDateTime()).isEqualTo(expectedAddedDateTime);
        assertThat(myProblem.getIsRight()).isEqualTo(true);
    }
}
