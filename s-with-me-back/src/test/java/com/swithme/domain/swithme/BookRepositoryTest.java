package com.swithme.domain.swithme;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    private int pubId = 123;
    private String subject = "test subject";
    private short price = 12000;
    private String pubDate = "test date";
    private String bookName = "test name";
    private short grade = 3;
    private String cover = "test cover";
    private boolean isAd = true;


    @Test
    public void saveLoadBook(){
        bookRepository.save(Book.builder()
                .pubId(pubId)
                .subject(subject)
                .price(price)
                .pubDate(pubDate)
                .bookName(bookName)
                .grade(grade)
                .cover(cover)
                .isAd(isAd)
                .build());

        List<Book> bookList = bookRepository.findAll();

        Book book = bookList.get(0);

        assertThat(book.getPubId()).isEqualTo(pubId);
        assertThat(book.getSubject()).isEqualTo(subject);
        assertThat(book.getPrice()).isEqualTo(price);
        assertThat(book.getPubDate()).isEqualTo(pubDate);
        assertThat(book.getBookName()).isEqualTo(bookName);
        assertThat(book.getGrade()).isEqualTo(grade);
        assertThat(book.getCover()).isEqualTo(cover);
        assertThat(book.getIsAd()).isEqualTo(isAd);
    }

    @After
    public void cleanup(){
        bookRepository.deleteAll();
    }

}
