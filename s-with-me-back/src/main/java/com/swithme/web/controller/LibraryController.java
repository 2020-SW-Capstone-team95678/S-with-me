package com.swithme.web.controller;

import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.service.LibraryService;
import com.swithme.web.dto.LibraryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping("/student/library")
    public LibraryResponseDto getMyBookList(){
        Student student = Student.builder()
                .id("id")
                .password("password")
                .birthDay("2020-02-02")
                .phoneNumber("123-456-7890")
                .name("name")
                .grade((short)4)
                .build();
        return libraryService.findMyBookList(student);
    }
}
