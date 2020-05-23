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

import java.util.*;

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
        List<Publisher> publisherList = publisherRepository.findAll();
        publisher = publisherList.get(0);

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .name("test name 1")
                .build());
        bookRepository.save(Book.builder()
                .publisher(publisher)
                .name("test name 2")
                .build());
    }

    @After
    public void cleanup(){
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
    }

    @Test
    public void findByPublisherTest(){
        List<Book> bookList = bookRepository.findByPublisher(publisher);
        Book book1 = bookList.get(0);
        Book book2 = bookList.get(1);

        assertThat(book1.getPublisher().getPublisherId()).isEqualTo(publisher.getPublisherId());
        assertThat(book2.getPublisher().getPublisherId()).isEqualTo(publisher.getPublisherId());

        assertThat(book1.getName()).isEqualTo("test name 1");
        assertThat(book2.getName()).isEqualTo("test name 2");
    }

}
