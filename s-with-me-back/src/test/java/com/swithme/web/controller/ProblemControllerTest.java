package com.swithme.web.controller;

import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemUpdateRequestDto;
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
    @Autowired
    private MyProblemRepository myProblemRepository;

    private SubChapter subChapter;

    @Before
    public void setup(){
        subChapterRepository.save(new SubChapter());
        subChapter = subChapterRepository.findAll().get(0);
        Problem problem = problemRepository.save(Problem.builder()
                .subChapter(subChapter)
                .build());
        myProblemRepository.save(MyProblem.builder()
                .problem(problem)
                .build());
    }

    @After
    public void cleanup(){
        myProblemRepository.deleteAll();
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
                .build());
        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter?subChapterId="
                 + subChapter.getSubChapterId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getProblemIdTest(){
        MyProblem myProblem = myProblemRepository.findAll().get(0);
        String url = "http://localhost:" + port + "/student/library/my-book/my-problem/problem-id?myProblemId="
                +myProblem.getMyProblemId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void createProblemsTest() {
        ProblemCreateDto createDto = ProblemCreateDto.builder()
                .subChapterId(subChapter.getSubChapterId())
                .content("test content")
                .solution("test solution")
                .answer("test answer")
                .problemNumber((short) 1)
                .isOptional(false)
                .option1(null)
                .option2(null)
                .option3(null)
                .option4(null)
                .option5(null)
                .build();

        List<ProblemCreateDto> createDtoList = new ArrayList<>();
        createDtoList.add(createDto);

        HttpEntity<List<ProblemCreateDto>> createEntity = new HttpEntity<>(createDtoList);
        String url = "http://localhost:" + port + "/publisher/library/book/mainChapter/subChapter/problems";
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, createEntity, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(problemRepository.findAll().size()).isGreaterThan(1);
    }

    @Test
    public void updateProblemTest(){
        ProblemUpdateRequestDto requestDto = ProblemUpdateRequestDto.builder()
                .subChapterId(subChapter.getSubChapterId())
                .content("test content")
                .solution("test solution")
                .answer("test answer")
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
}
