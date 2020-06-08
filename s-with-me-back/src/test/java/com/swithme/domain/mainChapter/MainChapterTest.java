package com.swithme.domain.mainChapter;

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
public class MainChapterTest {

    @Autowired
    private MainChapterRepository mainChapterRepository;

    @Before
    public void setup(){
        mainChapterRepository.save(MainChapter.builder()
                .beforeMainChapterId(0)
                .mainChapterName("3")
                .build());
        MainChapter firstMainChapter = mainChapterRepository.findAll().get(0);

        mainChapterRepository.save(MainChapter.builder()
                .beforeMainChapterId(firstMainChapter.getMainChapterId())
                .mainChapterName("2")
                .build());
        MainChapter secondMainChapter = mainChapterRepository.findAll().get(1);

        mainChapterRepository.save(MainChapter.builder()
                .beforeMainChapterId(secondMainChapter.getMainChapterId())
                .mainChapterName("1")
                .build());
    }

    @After
    public void cleanup(){
        mainChapterRepository.deleteAll();
    }

    @Test
    public void sortTest(){
        List<MainChapter> mainChapterList = mainChapterRepository.findAll();
        Collections.sort(mainChapterList);

        assertThat(mainChapterList.get(0).getMainChapterName()).isEqualTo("1");
        assertThat(mainChapterList.get(1).getMainChapterName()).isEqualTo("2");
        assertThat(mainChapterList.get(2).getMainChapterName()).isEqualTo("3");
    }
}
