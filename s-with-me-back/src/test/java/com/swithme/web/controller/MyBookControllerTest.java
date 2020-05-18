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
        myBookRepository.deleteAll();
        chapterRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void getChapterListTest(){
        List<MyBook> myBookList = myBookRepository.findAll();
        MyBook myBook = myBookList.get(0);

        String url = "http://localhost:" + port + "/student/library/my-book/" + myBook.getMyBookId() + "/chapters";

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
