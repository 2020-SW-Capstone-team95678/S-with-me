package com.swithme.web.controller;

import com.swithme.domain.chapter.Chapter;
import com.swithme.domain.chapter.ChapterRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
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
    private ChapterRepository chapterRepository;

    @Before
    public void setup(){
        chapterRepository.save(new Chapter());
        List<Chapter> chapterList = chapterRepository.findAll();
        Chapter chapter = chapterList.get(0);

        problemRepository.save(Problem.builder()
                .chapter(chapter)
                .content("test content")
                .solution("test solution")
                .pageNumber((short)1)
                .problemNumber((short)1)
                .answer("test answer")
                .isOptional(false)
                .option1("")
                .option2("")
                .option3("")
                .option4("")
                .option5("")
                .build());
    }

    @After
    public void cleanup(){
        problemRepository.deleteAll();
        chapterRepository.deleteAll();
    }

    @Test
    public void getProblemTest(){
        List<Problem> problemList = problemRepository.findAll();
        Problem problem = problemList.get(0);

        String url = "http://localhost:" + port +
                "/student/library/my-book/my-problems?problemId=" + problem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
