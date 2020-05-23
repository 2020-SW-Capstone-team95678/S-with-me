package com.swithme.web.controller;

import com.swithme.service.NoteService;
import com.swithme.web.dto.NoteResponseDto;
import com.swithme.web.dto.NoteSaveRequestDto;
import com.swithme.web.dto.NoteUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @CrossOrigin
    @PostMapping("/student/note")
    public String saveNote(@RequestBody NoteSaveRequestDto requestDto){
        return noteService.saveNote(requestDto);
    }

    @CrossOrigin
    @GetMapping("/student/note")
    public List<NoteResponseDto> getNoteList(@RequestParam("studentId") int studentId){
        return noteService.getNoteList(studentId);
    }

    @CrossOrigin
    @DeleteMapping("/student/note")
    public String deleteNote(@RequestParam int myProblemId){
        return noteService.deleteNote(myProblemId);
    }

    @CrossOrigin
    @PutMapping("/student/note/{noteId}")
    public String updateNote(@PathVariable int noteId,
                             @RequestBody NoteUpdateRequestDto requestDto){
        return noteService.updateNote(noteId, requestDto);
    }
}
