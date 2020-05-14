package com.swithme.web.controller;

import com.swithme.service.StudentService;
import com.swithme.web.dto.StudentResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/student")
    public StudentResponseDto findById(@RequestParam("studentId") int studentId){
        return studentService.findById(studentId);
    }

}
