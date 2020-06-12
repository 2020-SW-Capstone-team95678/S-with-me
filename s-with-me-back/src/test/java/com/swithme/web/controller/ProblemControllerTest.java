package com.swithme.web.controller;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemUpdateRequestDto;
import org.hibernate.engine.jdbc.ClobProxy;
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

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProblemControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private SubChapterRepository subChapterRepository;

    private SubChapter subChapter;
    private Problem problem;

    @Before
    public void setup(){
        subChapterRepository.save(new SubChapter());
        subChapter = subChapterRepository.findAll().get(0);
        problem = problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .beforeProblemId(0)
                .build());
    }

    @After
    public void cleanup(){
        problemRepository.deleteAll();
        subChapterRepository.deleteAll();
    }

    @Test
    public void getProblemTest(){
        Problem problem = problemRepository.findAll().get(0);

        String url = "http://localhost:" + port +
                "/student/library/my-book/my-problems?problemId=" + problem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getProblemListTest(){
        problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .content(null)
                .solution("test solution")
                .image("test image")
                .beforeProblemId(problem.getProblemId())
                .build());
        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter?subChapterId="
                 + subChapter.getSubChapterId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getAnswerListTest(){
        problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .answer("test answer")
                .beforeProblemId(problem.getProblemId())
                .build());
        String url = "http://localhost:" + port + "/student/library/my-book/main-chapter/sub-chapter/" +
                subChapter.getSubChapterId() + "?page=1";
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void createProblemTest() {
        ProblemCreateDto createDto = ProblemCreateDto.builder()
                .subChapterId(subChapter.getSubChapterId())
                .title("test title")
                .content("test content")
                .solution("test solution")
                .answer("test answer")
                .image(null)
                .problemNumber((short) 1)
                .isOptional(false)
                .option1(null)
                .option2(null)
                .option3(null)
                .option4(null)
                .option5(null)
                .isMath(false)
                .build();


        HttpEntity<ProblemCreateDto> createEntity = new HttpEntity<>(createDto);
        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter/subChapter/problem";
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, createEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(problemRepository.findAll().size()).isGreaterThan(1);
    }

    @Test
    public void updateProblemTest(){
        ProblemUpdateRequestDto requestDto = ProblemUpdateRequestDto.builder()
                .subChapterId(subChapter.getSubChapterId())
                .title("test title")
                .content("test content")
                .solution("test solution")
                .answer("test answer")
                .image(null)
                .problemNumber((short)123)
                .isOptional(false)
                .option1(null)
                .option2(null)
                .option3(null)
                .option4(null)
                .option5(null)
                .build();

        Problem problem = problemRepository.findAll().get(0);

        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter/subChapter/problem/" + problem.getProblemId();

        HttpEntity<ProblemUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        Problem updatedProblem = problemRepository.findAll().get(0);
        assertThat(updatedProblem.getProblemNumber()).isEqualTo((short)123);
    }


    @Test
    public void deleteFirstProblemTest(){
        assertThat(problemRepository.findAll()).isNotEmpty();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/sub-chapter/problem/"
                + problem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(problemRepository.findAll()).isEmpty();
    }

    @Test
    public void deleteSecondProblemIn3ProblemTest(){
        Problem secondProblem = problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .beforeProblemId(problem.getProblemId())
                .build());
        problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .beforeProblemId(secondProblem.getProblemId())
                .build());

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/sub-chapter/problem/"
                + secondProblem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        Problem thirdProblem = problemRepository.findAll().get(1);
        assertThat(thirdProblem.getBeforeProblemId()).isEqualTo(problem.getProblemId());
    }

    @Test
    public void deleteFirstProblemIn2ProblemTest(){
        problemRepository.save(Problem.builder()
            .subChapter(subChapter)
            .beforeProblemId(problem.getProblemId())
            .build());

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/sub-chapter/problem/"
                + problem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        Problem secondProblem = problemRepository.findAll().get(0);
        assertThat(secondProblem.getBeforeProblemId()).isEqualTo(0);
    }

    @Test
    public void deleteLastProblemTest(){
        problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .beforeProblemId(problem.getProblemId())
                .build());
        Problem secondProblem = problemRepository.findAll().get(1);

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);
        String url = "http://localhost:" + port + "/publisher/library/book/main-chapter/sub-chapter/problem/"
                + secondProblem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
