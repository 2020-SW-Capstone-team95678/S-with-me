package com.swithme.web.controller;

import com.swithme.service.ProblemService;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ProblemController {

    private final ProblemService problemService;

    @CrossOrigin
    @GetMapping("/student/library/my-book/my-problems")
    public ProblemResponseDto getProblem(@RequestParam("problemId") int problemId){
        return problemService.findById(problemId);
    }
}
