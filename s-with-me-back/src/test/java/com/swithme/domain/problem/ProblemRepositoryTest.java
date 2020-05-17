package com.swithme.domain.problem;

import com.swithme.domain.chapter.Chapter;
import com.swithme.domain.chapter.ChapterRepository;
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
public class ProblemRepositoryTest {

    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private ChapterRepository chapterRepository;

    private Chapter chapter;

    @Before
    public void setup(){
        chapterRepository.save(new Chapter());
        List<Chapter> chapterList = chapterRepository.findAll();
        chapter = chapterList.get(0);

        problemRepository.save(Problem.builder()
                .chapter(chapter)
                .problemNumber((short)1)
                .build());

        problemRepository.save(Problem.builder()
                .chapter(chapter)
                .problemNumber((short)2)
                .build());
    }

    @After
    public void cleanup(){
        problemRepository.deleteAll();
        chapterRepository.deleteAll();
    }

    @Test
    public void findByChapterTest(){
        List<Problem> problemList = problemRepository.findByChapter(chapter);
        Problem problem1 = problemList.get(0);
        Problem problem2 = problemList.get(1);

        assertThat(problem1.getChapter().getChapterId()).isEqualTo(chapter.getChapterId());
        assertThat(problem1.getProblemNumber()).isEqualTo((short)1);

        assertThat(problem2.getChapter().getChapterId()).isEqualTo(chapter.getChapterId());
        assertThat(problem2.getProblemNumber()).isEqualTo((short)2);
    }
}