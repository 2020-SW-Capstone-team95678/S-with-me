package com.swithme.domain.book;

import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    private Publisher publisher;

    @Before
    public void setup(){
        publisherRepository.save(new Publisher());
        publisher = publisherRepository.findAll().get(0);

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .build());
    }

    @After
    public void cleanup(){
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
    }

    @Test
    public void findByPublisherTest(){
        Book book = bookRepository.findByPublisher(publisher).get(0);
        assertThat(book.getPublisher().getPublisherId()).isEqualTo(publisher.getPublisherId());
    }
}
