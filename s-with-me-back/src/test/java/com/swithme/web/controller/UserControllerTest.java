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
public class UserControllerTest {

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
        Publisher publisher = publisherRepository.save(new Publisher());

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .monthlyProfit(10000000)
                .monthlySold(1000)
                .price(10000)
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisher)
                .monthlyProfit(12000000)
                .monthlySold(1000)
                .price(12000)
                .build());
    }

    @After
    public void cleanup(){
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
    }

    @Test
    public void getMonthlyProfitAndSoldTest(){
        Long expectedProfit = 22000000L;
        Long expectedFee = expectedProfit * 3 / 100;
        expectedProfit -= expectedFee;

        Integer expectedSold = 2000;

        Publisher publisher = publisherRepository.findAll().get(0);

        String url = "http://localhost:" + port + "/publisher/profile/profit?publisherId=" + publisher.getPublisherId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().contains(expectedProfit.toString())).isTrue();
        assertThat(responseEntity.getBody().contains(expectedSold.toString())).isTrue();
    }
}
