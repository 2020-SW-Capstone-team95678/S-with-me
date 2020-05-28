package com.swithme.web.controller;

import com.swithme.service.NoteService;
import com.swithme.web.dto.NoteResponseDto;
import com.swithme.web.dto.NoteCreateDto;
import com.swithme.web.dto.NoteUpdateRequestDto;
import jdk.nashorn.internal.objects.annotations.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class NoteController {

    private final NoteService noteService;

    @CrossOrigin
    @PostMapping("/student/note")
    public String createNote(@RequestBody NoteCreateDto createDto){
        return noteService.createNote(createDto);
    }

    @CrossOrigin
    @GetMapping("/student/note")
    public List<NoteResponseDto> getNoteList(@RequestParam("studentId") int studentId){
        return noteService.getNoteList(studentId);
    }

    @CrossOrigin
    @GetMapping("/student/{studentId}/note/folderFilter")
    public List<NoteResponseDto> getNoteListFilteredByFolder(@PathVariable int studentId,
                                                             @RequestParam("folderId") int folderId){
        return noteService.getNoteListFilteredByFolder(studentId, folderId);
    }

    @CrossOrigin
    @GetMapping("/student/{studentId}/note/subjectFilter")
    public List<NoteResponseDto> getNoteListFilteredBySubject(@PathVariable int studentId,
                                                              @RequestParam("subject") String subject){
        return noteService.getNoteListFilteredBySubject(studentId, subject);
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
