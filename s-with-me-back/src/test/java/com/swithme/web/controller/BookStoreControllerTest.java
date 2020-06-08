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
public class BookStoreControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private BookRepository bookRepository;

    @Before
    public void setup(){
        publisherRepository.save(new Publisher());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .isAdvertised(true)
                .name("kk")
                .grade((short) 2)
                .isOnSale(true)
                .subject("math")
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .isAdvertised(true)
                .name("kkkkk")
                .grade((short) 2)
                .isOnSale(true)
                .subject("english")
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .isAdvertised(true)
                .grade((short) 2)
                .isOnSale(false)
                .name("kkkkqqqq")
                .subject("math")
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .isAdvertised(true)
                .grade((short) 2)
                .isOnSale(false)
                .subject("english")
                .name("qqkkqqqq")
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .isAdvertised(true)
                .grade((short) 2)
                .name("oooo")
                .subject("math")
                .isOnSale(false)
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .isOnSale(false)
                .grade((short) 2)
                .name("okokok")
                .isAdvertised(true)
                .subject("science")
                .build());
    }

    @After
    public void clean(){
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
    }

    @Test
    public void getSwithMePickListTest(){
        String url="http://localhost:"+port+"/student/bookstore/s-with-me-pick/2";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(responseEntity.getBody()).isEqualTo("33");
    }

    @Test
    public void getBookStoreADByFilterTest(){
        String url="http://localhost:"+port+"/student/bookstore/2/?subject=math";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(responseEntity.getBody()).isEqualTo("33");
    }

    @Test
    public void getBookListByNameTest(){
        String url="http://localhost:"+port+"/student/bookstore/search?bookName=kk";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(responseEntity.getBody()).isEqualTo("33");
    }
}
