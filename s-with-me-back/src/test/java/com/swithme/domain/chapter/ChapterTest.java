package com.swithme.domain.chapter;
;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ChapterTest {

    private List<Chapter> chapterList;

    @Before
    public void setup(){
        chapterList = new ArrayList<>();
        chapterList.add(Chapter.builder()
                .level1Name("대단원1")
                .level2Name("소단원1")
                .build());
        chapterList.add(Chapter.builder()
                .level1Name("대단원2")
                .level2Name("소단원3")
                .build());
        chapterList.add(Chapter.builder()
                .level1Name("대단원3")
                .level2Name("소단원1")
                .build());
        chapterList.add(Chapter.builder()
                .level1Name("대단원2")
                .level2Name("소단원5")
                .build());
        chapterList.add(Chapter.builder()
                .level1Name("대단원3")
                .level2Name("소단원2")
                .build());
        chapterList.add(Chapter.builder()
                .level1Name("대단원1")
                .level2Name("소단원4")
                .build());
    }

    @Test
    public void sortTest(){
        Chapter.sort(chapterList);

        assertThat(chapterList.get(0).getLevel1Name()).isEqualTo("대단원1");
        assertThat(chapterList.get(1).getLevel2Name()).isEqualTo("소단원4");
        assertThat(chapterList.get(5).getLevel1Name()).isEqualTo("대단원3");
    }
}
