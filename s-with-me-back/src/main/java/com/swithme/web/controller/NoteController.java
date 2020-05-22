package com.swithme.web.controller;

import com.swithme.service.NoteService;
import com.swithme.web.dto.NoteResponseDto;
import com.swithme.web.dto.NoteSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/student/note")
    public int saveNote(@RequestBody NoteSaveRequestDto requestDto){
        return noteService.saveNote(requestDto);
    }

    @GetMapping("/student/note")
    public List<NoteResponseDto> getNoteList(@RequestParam("studentId") int studentId){
        return noteService.getNoteList(studentId);
    }
}
