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

    @Before
    public void setup(){
        publisherRepository.save(Publisher.builder()
                .id("test id")
                .password("test password")
                .name("test name")
                .code("test code")
                .build());
    }

    @After
    public void cleanup(){
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
    }

    @Test
    public void saveLoadBook(){
        List<Publisher> publisherList = publisherRepository.findAll();
        Publisher publisher = publisherList.get(0);
        String subject = "test subject";
        short price = 12345;
        String publishedDate = "2020-02-02";
        String name = "test name";
        short grade = 4;
        String cover = "test cover";
        boolean isAdvertised = true;

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .subject(subject)
                .price(price)
                .publishedDate(publishedDate)
                .name(name)
                .grade(grade)
                .cover(cover)
                .isAdvertised(isAdvertised)
                .build());

        List<Book> bookList = bookRepository.findAll();
        Book book = bookList.get(0);

        assertThat(book.getPublisher().getPublisherId()).isEqualTo(publisher.getPublisherId());
        assertThat(book.getSubject()).isEqualTo(subject);
        assertThat(book.getPrice()).isEqualTo(price);
        assertThat(book.getPublishedDate()).isEqualTo(publishedDate);
        assertThat(book.getName()).isEqualTo(name);
        assertThat(book.getGrade()).isEqualTo(grade);
        assertThat(book.getCover()).isEqualTo(cover);
        assertThat(book.isAdvertised()).isEqualTo(isAdvertised);

    }

}
