package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.CurriculumCreateDto;
import com.swithme.web.dto.MyBookCreateDto;
import com.swithme.web.dto.MyBookUpdateRequestDto;
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
public class MyBookControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private MyProblemRepository myProblemRepository;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private MainChapterRepository mainChapterRepository;
    @Autowired
    private SubChapterRepository subChapterRepository;

    @Before
    public void setup(){
        studentRepository.save(new Student());

        bookRepository.save(new Book());

        folderRepository.save(Folder.builder()
                .folderName("분류되지 않음")
                .student(studentRepository.findAll().get(0))
                .build());

        myBookRepository.save(MyBook.builder()
                .book(bookRepository.findAll().get(0))
                .folder(folderRepository.findAll().get(0))
                .build());
    }

    @After
    public void cleanup(){
        noteRepository.deleteAll();
        myProblemRepository.deleteAll();
        myBookRepository.deleteAll();
        subChapterRepository.deleteAll();
        mainChapterRepository.deleteAll();
        bookRepository.deleteAll();
        folderRepository.deleteAll();
        studentRepository.deleteAll();

    }

    @Test
    public void createMyBookTest(){
        mainChapterRepository.save(MainChapter.builder()
                .book(bookRepository.findAll().get(0))
                .beforeMainChapterId(0)
                .build());

        subChapterRepository.save(SubChapter.builder()
                .mainChapter(mainChapterRepository.findAll().get(0))
                .beforeSubChapterId(0)
                .build());


        MyBookCreateDto myBookCreateDto= MyBookCreateDto.builder()
                .studentId(studentRepository.findAll().get(0).getStudentId())
                .receiptId("0")
                .bookId(bookRepository.findAll().get(0).getBookId())
                .build();

        HttpEntity<MyBookCreateDto> requestEntity = new HttpEntity<>(myBookCreateDto);
        String url="http://localhost:"+port+"/student/library/my-book";
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(responseEntity.getBody()).isEqualTo("33");
    }

    @Test
    public void bringUpToDateTest(){
        MyBook myBook = myBookRepository.findAll().get(0);
        int myBookId = myBook.getMyBookId();
        MyBookUpdateRequestDto requestDto = MyBookUpdateRequestDto.builder()
                .lastSubChapterId(1)
                .lastPageNumber((short)1)
                .build();

        String url = "http://localhost:" + port + "/student/library/my-book/" + myBookId;
        HttpEntity<MyBookUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my Book이 없습니다. myBookId = " + myBookId));
        assertThat(myBook.getLastPageNumber()).isEqualTo(requestDto.getLastPageNumber());
    }

    @Test
    public void getMyBookListTest(){
        Student student = studentRepository.findAll().get(0);

        String url = "http://localhost:" + port + "/student/library?studentId=" + student.getStudentId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getMyBookListFilteredByFolder(){
        String url = "http://localhost:" + port + "/student/library/my-book/folderFilter?folderId=" + folderRepository.findAll().get(0).getFolderId();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void deleteMyBookTest(){
        MyBook myBook = myBookRepository.findAll().get(0);

        myProblemRepository.save(MyProblem.builder()
                .myBook(myBook)
                .build());
        MyProblem myProblem = myProblemRepository.findAll().get(0);

        noteRepository.save(Note.builder()
                .myProblem(myProblem)
                .build());

        assertThat(myBookRepository.findAll()).isNotEmpty();
        assertThat(myProblemRepository.findAll()).isNotEmpty();
        assertThat(noteRepository.findAll()).isNotEmpty();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/student/library/my-book/" + myBook.getMyBookId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(myBookRepository.findAll()).isEmpty();
        assertThat(myProblemRepository.findAll()).isEmpty();
        assertThat(noteRepository.findAll()).isEmpty();
    }
}
