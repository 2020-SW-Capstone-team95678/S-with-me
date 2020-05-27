package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
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

    @Before
    public void setup(){
        bookRepository.save(new Book());
        Book book = bookRepository.findAll().get(0);

        myBookRepository.save(MyBook.builder()
                .book(book)
                .build());
    }

    @After
    public void cleanup(){
        myBookRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void updateLastPageNumberTest(){
        MyBook myBook = myBookRepository.findAll().get(0);
        int myBookId = myBook.getMyBookId();
        MyBookUpdateRequestDto requestDto = MyBookUpdateRequestDto.builder()
                .lastPageNumber((short)1)
                .build();

        String url = "http://localhost:" + port + "/student/library/my-book/" + myBookId + "/lastPageNumber";
        HttpEntity<MyBookUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my Book이 없습니다. myBookId = " + myBookId));
        assertThat(myBook.getLastPageNumber()).isEqualTo(requestDto.getLastPageNumber());
    }
}
