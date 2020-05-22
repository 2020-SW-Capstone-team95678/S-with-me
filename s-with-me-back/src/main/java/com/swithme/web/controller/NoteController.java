package com.swithme.web.controller;

import com.swithme.service.NoteService;
import com.swithme.web.dto.NoteSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/student/note")
    public int saveNote(@RequestBody NoteSaveRequestDto requestDto){
        return noteService.saveNote(requestDto);
    }
}
