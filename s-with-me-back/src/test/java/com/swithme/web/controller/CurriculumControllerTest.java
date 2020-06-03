package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.CurriculumCreateDto;
import com.swithme.web.dto.CurriculumResponseDto;
import com.swithme.web.dto.NoteCreateDto;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CurriculumControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
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
    private PublisherRepository publisherRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private CurriculumRepository curriculumRepository;
    @Autowired
    private MainChapterRepository mainChapterRepository;
    @Autowired
    private SubChapterRepository subChapterRepository;

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
        folderRepository.save(Folder.builder()
                .student(studentRepository.findAll().get(0))
                .folderName("분류되지 않음")
                .build());

        publisherRepository.save(new Publisher());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .build());

        myBookRepository.save(MyBook.builder()
                .book(bookRepository.findAll().get(0))
                .folder(folderRepository.findAll().get(0))
                .build());

        mainChapterRepository.save(MainChapter.builder()
                .book(bookRepository.findAll().get(0))
                .build());

        subChapterRepository.save(SubChapter.builder()
                .mainChapter(mainChapterRepository.findAll().get(0))
                .build());

        problemRepository.save(Problem.builder()
                .subChapter(subChapterRepository.findAll().get(0))
                .build());
        problemRepository.save(Problem.builder()
                .subChapter(subChapterRepository.findAll().get(0))
                .build());
        problemRepository.save(Problem.builder()
                .subChapter(subChapterRepository.findAll().get(0))
                .build());

        myProblemRepository.save(MyProblem.builder()
                .myBook(myBookRepository.findAll().get(0))
                .problem(problemRepository.findAll().get(0))
                .solvedDateTime(1591056000001L)
                .build());
    }

    @After
    public void cleanup(){
        curriculumRepository.deleteAll();
        myProblemRepository.deleteAll();
        problemRepository.deleteAll();
        subChapterRepository.deleteAll();
        mainChapterRepository.deleteAll();
        myBookRepository.deleteAll();
        bookRepository.deleteAll();
        folderRepository.deleteAll();
        publisherRepository.deleteAll();
        studentRepository.deleteAll();
    }
    @Test
    public void curriculumCreateTest()
    {
        assertThat(studentRepository.findAll()).isNotEmpty();
        assertThat(folderRepository.findAll()).isNotEmpty();
        assertThat(publisherRepository.findAll()).isNotEmpty();
        assertThat(bookRepository.findAll()).isNotEmpty();
        assertThat(myBookRepository.findAll()).isNotEmpty();
        assertThat(mainChapterRepository.findAll()).isNotEmpty();
        assertThat(subChapterRepository.findAll()).isNotEmpty();
        assertThat(problemRepository.findAll()).isNotEmpty();
        assertThat(myProblemRepository.findAll()).isNotEmpty();

        CurriculumCreateDto curriculumCreateDto= CurriculumCreateDto.builder()
                .dailyGoal(3)
                .subChapterId(0)
                .type("daily")
                .myBookId(myBookRepository.findAll().get(0).getMyBookId())
                .monthlyGoal("AAA")

                .build();
        HttpEntity<CurriculumCreateDto> requestEntity = new HttpEntity<>(curriculumCreateDto);
        String url="http://localhost:"+port+"/student/library/curriculum";
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(curriculumRepository.findAll()).isNotEmpty();
    }

    @Test
    public void curriculumResponseTest()
    {
        curriculumRepository.save(Curriculum.builder()
                .myBook(myBookRepository.findAll().get(0))
                .dailyGoal(3)
                .monthlyGoal("AAA")
                .type("daily")
                .build());
        String url="http://localhost:"+port+"/student/library/curriculum?myBookId="+myBookRepository.findAll().get(0).getMyBookId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void curriculumListResponseTest()
    {
        curriculumRepository.save(Curriculum.builder()
                .myBook(myBookRepository.findAll().get(0))
                .dailyGoal(3)
                .monthlyGoal("AAA")
                .type("daily")
                .build());

        myBookRepository.save(MyBook.builder()
                .book(bookRepository.findAll().get(0))
                .folder(folderRepository.findAll().get(0))
                .build());
        curriculumRepository.save(Curriculum.builder()
                .myBook(myBookRepository.findAll().get(1))
                .type("weekly")
                .monthlyGoal("BBB")
                .build());

        String url="http://localhost:"+port+"/student/library/curriculum/list?studentId="+studentRepository.findAll().get(0).getStudentId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        //assertThat(responseEntity.getBody()).isEqualTo("33");
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void curriculumArchievementTest()
    {
        curriculumRepository.save(Curriculum.builder()
                .myBook(myBookRepository.findAll().get(0))
                .dailyGoal(3)
                .monthlyGoal("AAA")
                .type("daily")
                .build());
        myProblemRepository.save(MyProblem.builder()
                .myBook(myBookRepository.findAll().get(0))
                .problem(problemRepository.findAll().get(0))
                .solvedDateTime(1590L)
                .build());
        myProblemRepository.save(MyProblem.builder()
                .myBook(myBookRepository.findAll().get(0))
                .problem(problemRepository.findAll().get(0))
                .solvedDateTime(1591L)
                .build());
        myProblemRepository.save(MyProblem.builder()
                .myBook(myBookRepository.findAll().get(0))
                .problem(problemRepository.findAll().get(0))
                .solvedDateTime(1591056000001L)
                .build());
        assertThat(studentRepository.findAll()).isNotEmpty();
        assertThat(folderRepository.findAll()).isNotEmpty();
        assertThat(publisherRepository.findAll()).isNotEmpty();
        assertThat(bookRepository.findAll()).isNotEmpty();
        assertThat(myBookRepository.findAll()).isNotEmpty();
        assertThat(mainChapterRepository.findAll()).isNotEmpty();
        assertThat(subChapterRepository.findAll()).isNotEmpty();
        assertThat(problemRepository.findAll()).isNotEmpty();
        assertThat(myProblemRepository.findAll()).isNotEmpty();

        String url="http://localhost:"+port+"/student/library/curriculum/achievement?myBookId="+myBookRepository.findAll().get(0).getMyBookId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(responseEntity.getBody()).isEqualTo("33");
    }
}

