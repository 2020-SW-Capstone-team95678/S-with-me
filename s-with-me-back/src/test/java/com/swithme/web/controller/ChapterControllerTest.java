package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.MainChapterCreateDto;
import com.swithme.web.dto.SubChapterCreateDto;
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
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChapterControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private MainChapterRepository mainChapterRepository;
    @Autowired
    private SubChapterRepository subChapterRepository;

    private Book book;
    private MainChapter mainChapter;

    @Before
    public void setup() {
        bookRepository.save(new Book());
        book = bookRepository.findAll().get(0);

        mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .build());
        mainChapter = mainChapterRepository.findAll().get(0);

        subChapterRepository.save(SubChapter.builder()
                .mainChapter(mainChapter)
                .build());
    }

    @After
    public void cleanup(){
        subChapterRepository.deleteAll();
        mainChapterRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void getChapterListTest(){
        String url = "http://localhost:" + port + "/student/library/my-book/chapters?bookId=" + book.getBookId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void createMainChapterTest(){
        MainChapterCreateDto createDto = MainChapterCreateDto.builder()
                .bookId(book.getBookId())
                .mainChapterName("test name")
                .build();

        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter";

        HttpEntity<MainChapterCreateDto> createEntity = new HttpEntity<>(createDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, createEntity, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(mainChapterRepository.findAll().size()).isGreaterThan(1);
    }

    @Test
    public void createSubChapterTest(){
        SubChapterCreateDto createDto = SubChapterCreateDto.builder()
                .mainChapterId(mainChapter.getMainChapterId())
                .subChapterName("test name")
                .build();

        String url = "http://localhost:" + port + "/publisher/library/book/subChapter";

        HttpEntity<SubChapterCreateDto> createEntity = new HttpEntity<>(createDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, createEntity, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(subChapterRepository.findAll().size()).isGreaterThan(1);
    }
}
