package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.chapter.Chapter;
import com.swithme.domain.chapter.ChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

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
    private ChapterRepository chapterRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private MyProblemRepository myProblemRepository;

    @Before
    public void setup(){
        bookRepository.save(new Book());
        List<Book> bookList = bookRepository.findAll();
        Book book = bookList.get(0);

        myBookRepository.save(MyBook.builder()
                .book(book)
                .build());

        chapterRepository.save(Chapter.builder()
                .book(book)
                .build());
        chapterRepository.save(Chapter.builder()
                .book(book)
                .build());
        chapterRepository.save(Chapter.builder()
                .book(book)
                .build());
    }

    @After
    public void cleanup(){
        myProblemRepository.deleteAll();
        myBookRepository.deleteAll();
        chapterRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void getChapterListTest(){
        List<MyBook> myBookList = myBookRepository.findAll();
        MyBook myBook = myBookList.get(0);

        String url = "http://localhost:" + port + "/student/library/my-book/" + myBook.getMyBookId();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

//    @Test
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
    @Test
    public void updateMySolutionTest() throws Exception{

        MyProblem myProblem = myProblemRepository.save(new MyProblem());

        int myProblemId = myProblem.getMyProblemId();
        String expectedMySolution = "updated solution";
        String expectedMyAnswer = "updated answer";

        MyProblemUpdateRequestDto requestDto = MyProblemUpdateRequestDto.builder()
                .mySolution(expectedMySolution)
                .myAnswer(expectedMyAnswer)
                .build();

        String url = "http://localhost:" + port + "/student/library/my-book/my-problems/" + myProblemId;

        HttpEntity<MyProblemUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        MyProblem updatedMyProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemId = " + myProblemId));
        assertThat(updatedMyProblem.getMySolution()).isEqualTo(expectedMySolution);
        assertThat(updatedMyProblem.getMyAnswer()).isEqualTo(expectedMyAnswer);
    }
}
