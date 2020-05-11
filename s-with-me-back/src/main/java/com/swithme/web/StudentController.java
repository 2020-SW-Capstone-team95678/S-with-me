package com.swithme.web;

import com.swithme.service.StudentService;
import com.swithme.web.dto.StudentResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/student")
    public StudentResponseDto findById(){
        int studentId = 1;  //실제 id값으로 수정 필요
        return studentService.findById(studentId);
    }

}
