package com.swithme.web.controller;

import com.swithme.service.NoteService;
import com.swithme.web.dto.NoteResponseDto;
import com.swithme.web.dto.NoteCreateDto;
import com.swithme.web.dto.NoteUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
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
    @GetMapping("/student/{studentId}/note")
    public List<NoteResponseDto> getNoteList(@PathVariable int studentId,
                                             @RequestParam("page") short page) throws SQLException {
        return noteService.getNoteList(studentId, page);
    }

    @CrossOrigin
    @GetMapping("/student/{studentId}/note/folder-filter")
    public List<NoteResponseDto> getNoteListFilteredByFolder(@PathVariable int studentId,
                                                             @RequestParam("folderId") int folderId,
                                                             @RequestParam("page") short page) throws SQLException {
        return noteService.getNoteListFilteredByFolder(studentId, folderId, page);
    }

    @CrossOrigin
    @GetMapping(value = "/student/{studentId}/note/subject-filter")
    public List<NoteResponseDto> getNoteListFilteredBySubject(@PathVariable int studentId,
                                                              @RequestParam("subject") String subject,
                                                              @RequestParam("page") short page) throws SQLException {
        return noteService.getNoteListFilteredBySubject(studentId, subject, page);
    }

    @CrossOrigin
    @DeleteMapping("/student/note")
    public String deleteNote(@RequestParam("myProblemId") int myProblemId){
        return noteService.deleteNote(myProblemId);
    }

    @CrossOrigin
    @PutMapping("/student/note/{noteId}")
    public String updateNote(@PathVariable int noteId,
                             @RequestBody NoteUpdateRequestDto requestDto){
        return noteService.updateNote(noteId, requestDto);
    }
}
