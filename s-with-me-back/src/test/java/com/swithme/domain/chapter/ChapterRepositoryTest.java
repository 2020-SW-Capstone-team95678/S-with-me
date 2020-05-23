package com.swithme.domain.chapter;

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
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ChapterRepositoryTest{

    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    private Book book;

    @Before
    public void setup(){
        publisherRepository.save(new Publisher());
        List<Publisher> publisherList = publisherRepository.findAll();
        Publisher publisher = publisherList.get(0);

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .build());
        List<Book> bookList = bookRepository.findAll();
        book = bookList.get(0);

        chapterRepository.save(Chapter.builder()
                .book(book)
                .isLevel1(true)
                .level1Name("level1")
                .isLevel2(false)
                .build());
        chapterRepository.save(Chapter.builder()
                .book(book)
                .isLevel1(false)
                .level1Name("level1")
                .isLevel2(true)
                .level2Name("level2")
                .build());
    }

    @After
    public void cleanup(){
        chapterRepository.deleteAll();
        bookRepository.deleteAll();;
        publisherRepository.deleteAll();
    }

    @Test
    public void findByBookTest(){
        List<Chapter> chapterList = chapterRepository.findByBook(book);
        Chapter bigChapter = chapterList.get(0);
        Chapter smallChapter = chapterList.get(1);

        assertThat(bigChapter.getBook().getBookId()).isEqualTo(book.getBookId());
        assertThat(bigChapter.isLevel1()).isEqualTo(true);
        assertThat(bigChapter.isLevel2()).isEqualTo(false);

        assertThat(smallChapter.getBook().getBookId()).isEqualTo(book.getBookId());
        assertThat(smallChapter.isLevel1()).isEqualTo(false);
        assertThat(smallChapter.isLevel2()).isEqualTo(true);
    }
}