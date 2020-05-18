package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import lombok.Builder;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MyProblemControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private MyProblemRepository myProblemRepository;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private ProblemRepository problemRepository;

    private Student student;
    private Folder folder;
    private List<Problem> problemList;
    private MyBook myBook;

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
        student = studentRepository.findByUserId("test id")
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다."));

        folderRepository.save(Folder.builder()
                .student(student)
                .build());
        List<Folder> folderList = folderRepository.findByStudent(student);
        folder = folderList.get(0);

        problemRepository.save(Problem.builder()
                .pageNumber((short)1)
                .build());
        problemRepository.save(Problem.builder()
                .pageNumber((short)1)
                .build());
        problemList = problemRepository.findAll();

        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .build());
        List<MyBook> myBookList = myBookRepository.findByFolder(folder);
        myBook = myBookList.get(0);

        myProblemRepository.save(MyProblem.builder()
                .problem(problemList.get(0))
                .myBook(myBook)
                .build());

        myProblemRepository.save(MyProblem.builder()
                .problem(problemList.get(1))
                .myBook(myBook)
                .build());
    }

    @After
    public void cleanup(){
        noteRepository.deleteAll();
        myProblemRepository.deleteAll();
        myBookRepository.deleteAll();
        problemRepository.deleteAll();
        folderRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Ignore
    @Test
    public void updateMyProblemTest() throws Exception{
        List<MyProblem> myProblemList = myProblemRepository.findAll();

        int myProblemId = myProblemList.get(0).getMyProblemId();
        String expectedMySolution = "updated solution";
        String expectedMyAnswer = "updated answer";

        MyProblemUpdateRequestDto requestDto = MyProblemUpdateRequestDto.builder()
                .mySolution(expectedMySolution)
                .myAnswer(expectedMyAnswer)
                .isConfused(true)
                .isRight(false)
                .solvedDateTime(12345L)
                .build();

        String url = "http://localhost:" + port + "/student/library/my-book/my-problems/" + myProblemId;

        HttpEntity<MyProblemUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        MyProblem updatedMyProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemId = " + myProblemId));
        assertThat(updatedMyProblem.getMySolution()).isEqualTo(expectedMySolution);
        assertThat(updatedMyProblem.getMyAnswer()).isEqualTo(expectedMyAnswer);

        assertThat(noteRepository.findAll()).isNotNull();
    }

    @Test
    public void getMyProblemList(){
        String url = "http://localhost:" + port + "/student/library/my-book/" + myBook.getMyBookId()
                + "/my-problems?page=" + problemList.get(0).getPageNumber();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

//    public void updateMySolutionTest() throws Exception{
//
//        myProblemRepository.save(new MyProblem());
//        myProblemRepository.save(new MyProblem());
//        myProblemRepository.save(new MyProblem());
//
//        String expectedMySolution = "updated solution";
//        String expectedMyAnswer = "updated answer";
//        List<MyProblem> myProblemList = myProblemRepository.findAll();
//
//        MyProblemUpdateRequestDto requestDto = new MyProblemUpdateRequestDto(myProblemList);
//
//        String url = "http://localhost:" + port + "/student/library/my-book/my-problems";
//
//        HttpEntity<MyProblemUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
//
//        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);
//
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//    }
}
