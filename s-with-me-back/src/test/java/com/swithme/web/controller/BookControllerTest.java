package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    private Publisher publisher;

    @Before
    public void setup(){
        publisherRepository.save(new Publisher());
        publisher = publisherRepository.findAll().get(0);
    }

    @After
    public void cleanup(){
        bookRepository.deleteAll();
    }

    @Test
    public void getBookTest(){
        bookRepository.save(Book.builder()
                .monthlySold(123)
                .monthlyProfit(123)
                .totalProblemNumber((short)123)
                .isAdvertised(false)
                .cover("test cover")
                .grade((short)4)
                .publishedDate("2020-02-02")
                .name("test name")
                .subject("test subject")
                .publisher(publisher)
                .price(12345)
                .build());

        Book book = bookRepository.findAll().get(0);

        String url = "http://localhost:" + port + "/student/library/my-book?bookId=" + book.getBookId();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

}
