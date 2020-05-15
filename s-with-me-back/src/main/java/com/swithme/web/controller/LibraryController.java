package com.swithme.web.controller;

import com.swithme.domain.student.Student;
import com.swithme.service.LibraryService;
import com.swithme.web.dto.LibraryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping("/student/library")
    public LibraryResponseDto getMyBookList(@RequestParam("studentId") int studentId){
        return libraryService.findMyBookList(studentId);
    }
}
