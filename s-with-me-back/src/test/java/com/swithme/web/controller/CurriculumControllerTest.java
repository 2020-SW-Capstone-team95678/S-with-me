package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
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

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CurriculumControllerTest {
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
    private PublisherRepository publisherRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private CurriculumRepository curriculumRepository;

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
    }

    @After
    public void cleanup(){
        curriculumRepository.deleteAll();
        myBookRepository.deleteAll();
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
        folderRepository.deleteAll();
        studentRepository.deleteAll();
    }
    @Test
    public void curriculumCreateTest()
    {
        assertThat(myBookRepository.findAll()).isNotEmpty();
        CurriculumCreateDto curriculumCreateDto= CurriculumCreateDto.builder()
                .goalNumber(3)
                .type("week")
                .myBookId(1)
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
        assertThat(myBookRepository.findAll()).isNotEmpty();
        curriculumRepository.save(Curriculum.builder()
                .type("asd")
                .myBook(myBookRepository.findAll().get(0))
                .goalNumber(3)
                .build());
        String url="http://localhost:"+port+"/student/library/curriculum/?studentId="+student.getStudentId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}

