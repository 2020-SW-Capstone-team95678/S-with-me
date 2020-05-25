package com.swithme.web.controller;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
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
public class ProblemControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private SubChapterRepository subChapterRepository;

    @Before
    public void setup(){
        subChapterRepository.save(new SubChapter());
        SubChapter subchapter = subChapterRepository.findAll().get(0);
        problemRepository.save(Problem.builder()
                .subChapter(subchapter)
                .build());

    }

    @After
    public void cleanup(){
        problemRepository.deleteAll();
    }

    @Test
    public void getProblemTest(){
        Problem problem = problemRepository.findAll().get(0);

        String url = "http://localhost:" + port +
                "/student/library/my-book/my-problems?problemId=" + problem.getProblemId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
