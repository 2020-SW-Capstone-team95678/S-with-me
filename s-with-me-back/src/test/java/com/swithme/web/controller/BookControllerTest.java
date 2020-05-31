package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.web.dto.BookCreateDto;
import com.swithme.web.dto.BookUpdateRequestDto;
import org.junit.After;
import org.junit.Before;
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
import org.springframework.security.core.parameters.P;
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
        publisherRepository.deleteAll();
    }

    @Test
    public void getBookInformationTest(){
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

    @Test
    public void getBookListTest(){
        for(int i = 0; i < 3; i++){
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
        }

        String url = "http://localhost:" + port + "/publisher/library/book?publisherId=" + publisher.getPublisherId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getBookTest(){
        bookRepository.save(Book.builder()
                .subject("test subject")
                .build());
        Book book = bookRepository.findAll().get(0);

        String url = "http://localhost:" + port + "/publisher/library/book/" + book.getBookId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    @Test
    public void saveBookTest(){
        assertThat(bookRepository.findAll()).isEmpty();

        BookCreateDto requestDto = BookCreateDto.builder()
                .publisherId(publisher.getPublisherId())
                .subject("test subject")
                .price(12345)
                .publishedDate("2020-02-02")
                .name("test name")
                .grade((short)4)
                .cover("test cover")
                .build();

        HttpEntity<BookCreateDto> requestEntity = new HttpEntity<>(requestDto);
        String url = "http://localhost:" + port + "/publisher/library/book";
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(bookRepository.findAll()).isNotEmpty();

        int index = bookRepository.findByPublisher(publisher).size() - 1;
        assertThat(bookRepository.findByPublisher(publisher).get(index).getName())
                .isEqualTo("test name");
    }

    @Test
    public void updateBookTest(){
        bookRepository.save(new Book());
        BookUpdateRequestDto requestDto = BookUpdateRequestDto.builder()
                .subject("test subject")
                .price(123)
                .name("test name")
                .publishedDate("2020-02-02")
                .grade((short)4)
                .cover("test cover")
                .build();
        Book book = bookRepository.findAll().get(0);
        System.out.println(book.getBookId());
        String url = "http://localhost:" + port + "/publisher/library/book/" + book.getBookId();

        HttpEntity<BookUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        Book updatedBook = bookRepository.findById(book.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 없습니다. bookId = " + book.getBookId()));
        assertThat(updatedBook.getPrice()).isEqualTo(123);
    }
}
