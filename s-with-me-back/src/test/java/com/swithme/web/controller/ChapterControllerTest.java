package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.MainChapterCreateDto;
import com.swithme.web.dto.MainChapterUpdateRequestDto;
import com.swithme.web.dto.SubChapterCreateDto;
import com.swithme.web.dto.SubChapterUpdateRequestDto;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.in;

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
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private ProblemRepository problemRepository;

    private Book book;
    private MainChapter mainChapter;
    private SubChapter subChapter;

    @Before
    public void setup() {
        bookRepository.save(new Book());
        book = bookRepository.findAll().get(0);

        mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .beforeMainChapterId(0)
                .build());
        mainChapter = mainChapterRepository.findAll().get(0);

        subChapterRepository.save(SubChapter.builder()
                .mainChapter(mainChapter)
                .build());
        subChapter = subChapterRepository.findAll().get(0);

        problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .build());
    }

    @After
    public void cleanup(){
        problemRepository.deleteAll();
        myBookRepository.deleteAll();
        subChapterRepository.deleteAll();
        mainChapterRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    public void getChapterListTest(){
        String url = "http://localhost:" + port + "/library/book/" + book.getBookId() + "/chapters";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getMyBookChapterListTest(){
        MyBook myBook = myBookRepository.save(MyBook.builder()
                .book(book)
                .build());

        String url = "http://localhost:" + port + "/student/library/my-book/chapters?myBookId=" + myBook.getMyBookId();
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

        int last = mainChapterRepository.findByBook(book).size() - 1;
        assertThat(mainChapterRepository.findByBook(book).get(last).getMainChapterName())
                .isEqualTo("test name");
    }

    @Test
    public void createSubChapterTest(){
        SubChapterCreateDto createDto = SubChapterCreateDto.builder()
                .mainChapterId(mainChapter.getMainChapterId())
                .subChapterName("test name")
                .build();

        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter/subChapter";

        HttpEntity<SubChapterCreateDto> createEntity = new HttpEntity<>(createDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, createEntity, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(subChapterRepository.findAll().size()).isGreaterThan(1);

        int index = subChapterRepository.findByMainChapter(mainChapter).size() - 1;
        assertThat(subChapterRepository.findByMainChapter(mainChapter).get(index).getSubChapterName())
                .isEqualTo("test name");
    }

    @Test
    public void updateMainChapterTest(){
        String expectedName = "expected name";
        MainChapterUpdateRequestDto requestDto = MainChapterUpdateRequestDto.builder()
                .mainChapterName(expectedName)
                .build();

        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter/" + mainChapter.getMainChapterId();

        HttpEntity<MainChapterUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        MainChapter updatedMainChapter = mainChapterRepository.findAll().get(0);
        assertThat(updatedMainChapter.getMainChapterName()).isEqualTo(expectedName);
    }

    @Test
    public void updateSubChapterTest(){
        String expectedName = "expected name";
        SubChapterUpdateRequestDto requestDto = SubChapterUpdateRequestDto.builder()
                .mainChapterId(mainChapter.getMainChapterId())
                .subChapterName(expectedName)
                .build();

        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter/subChapter/" + subChapter.getSubChapterId();

        HttpEntity<SubChapterUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        SubChapter updatedSubChapter = subChapterRepository.findAll().get(0);
        assertThat(updatedSubChapter.getSubChapterName()).isEqualTo(expectedName);
    }

    @Test
    public void deleteFirstMainChapterTest(){
        assertThat(mainChapterRepository.findAll()).isNotEmpty();
        assertThat(subChapterRepository.findAll()).isNotEmpty();
        assertThat(problemRepository.findAll()).isNotEmpty();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/"
                + mainChapter.getMainChapterId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(mainChapterRepository.findAll()).isEmpty();
        assertThat(subChapterRepository.findAll()).isEmpty();
        assertThat(problemRepository.findAll()).isEmpty();
    }

    @Test
    public void deleteMainChapterWithNoSubChapterTest(){
        //main chapter만 남기고 나머지 삭제
        problemRepository.deleteAll();
        subChapterRepository.deleteAll();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/"
                + mainChapter.getMainChapterId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(mainChapterRepository.findAll()).isEmpty();
    }

    @Test
    public void deleteSecondMainChapterIn3MainChapterTest(){
        MainChapter secondMainChapter = mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .beforeMainChapterId(mainChapter.getMainChapterId())
                .build());
        mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .beforeMainChapterId(secondMainChapter.getMainChapterId())
                .build());

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/"
                + secondMainChapter.getMainChapterId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        MainChapter thirdMainChapter = mainChapterRepository.findAll().get(1);
        assertThat(thirdMainChapter.getBeforeMainChapterId()).isEqualTo(mainChapter.getMainChapterId());
    }

    @Test
    public void deleteFirstMainChapterIn2MainChapterTest(){
        mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .beforeMainChapterId(mainChapter.getMainChapterId())
                .build());

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/"
                + mainChapter.getMainChapterId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        MainChapter secondMainChapter = mainChapterRepository.findAll().get(0);
        assertThat(secondMainChapter.getBeforeMainChapterId()).isEqualTo(0);
    }

    @Test
    public void deleteLastMainChapterTest(){
        mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .beforeMainChapterId(mainChapter.getMainChapterId())
                .build());
        MainChapter secondMainChapter = mainChapterRepository.findAll().get(1);

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/"
                + secondMainChapter.getMainChapterId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void deleteSubChapterTest(){
        assertThat(subChapterRepository.findAll()).isNotEmpty();
        assertThat(problemRepository.findAll()).isNotEmpty();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/sub-chapter/"
                + subChapter.getSubChapterId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(subChapterRepository.findAll()).isEmpty();
        assertThat(problemRepository.findAll()).isEmpty();
    }
}
