package com.swithme.domain.note;

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
public class NoteTest {

    @Autowired
    private NoteRepository noteRepository;

    @Before
    public void setup() {
        for(int i = 5; i > 0; i--) {
            noteRepository.save(Note.builder()
                    .addedDateTime((long)i)
                    .build());
        }
    }

    @After
    public void cleanup(){
        noteRepository.deleteAll();
    }

    @Test
    public void sortTest(){
        List<Note> noteList = noteRepository.findAll();
        assertThat(noteList.get(0).getAddedDateTime()).isEqualTo(5);

        Note.sort(noteList);

        assertThat(noteList.get(0).getAddedDateTime()).isEqualTo(1);
    }
}
