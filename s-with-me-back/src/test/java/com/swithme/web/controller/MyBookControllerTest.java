package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.chapter.Chapter;
import com.swithme.domain.chapter.ChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
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
                .level1Name("대단원1")
                .level2Name("소단원1")
                .build());
        chapterRepository.save(Chapter.builder()
                .book(book)
                .level1Name("대단원3")
                .level2Name("소단원3")
                .build());
        chapterRepository.save(Chapter.builder()
                .book(book)
                .level1Name("대단원2")
                .level2Name("소단원2")
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

    @Test
    public void updatePageNumber(){
        MyBook myBook = myBookRepository.findAll().get(0);
        int myBookId = myBook.getMyBookId();
        MyBookUpdateRequestDto requestDto = MyBookUpdateRequestDto.builder()
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
}
