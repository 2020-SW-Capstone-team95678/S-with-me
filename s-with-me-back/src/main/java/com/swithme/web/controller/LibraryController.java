package com.swithme.web.controller;

import com.swithme.service.LibraryService;
import com.swithme.web.dto.MyBookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class LibraryController {

    private final LibraryService libraryService;

    @CrossOrigin
    @GetMapping("/student/library")
    public List<MyBookResponseDto> getMyBookList(@RequestParam("studentId") int studentId){
        return libraryService.findMyBookList(studentId);

    }
}
