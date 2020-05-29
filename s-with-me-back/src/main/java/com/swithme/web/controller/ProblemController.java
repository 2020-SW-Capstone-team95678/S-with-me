package com.swithme.web.controller;

import com.swithme.service.ProblemService;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemResponseDto;
import com.swithme.web.dto.ProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RequiredArgsConstructor
@RestController
public class ProblemController {

    private final ProblemService problemService;

    @CrossOrigin
    @GetMapping("/student/library/my-book/my-problems")
    public ProblemResponseDto getProblem(@RequestParam("problemId") int problemId){
        return problemService.findById(problemId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/problems")
    public String createProblems (@RequestBody List<ProblemCreateDto> createDtoList){
        return problemService.createProblems(createDtoList);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/problem/{problemId}")
    public String updateProblem(@PathVariable int problemId,
                                @RequestBody ProblemUpdateRequestDto requestDto){
        return problemService.updateProblem(problemId, requestDto);
    }
}
