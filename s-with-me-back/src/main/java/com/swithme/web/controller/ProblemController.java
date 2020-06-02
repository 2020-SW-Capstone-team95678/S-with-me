package com.swithme.web.controller;

import com.swithme.service.ProblemService;
import com.swithme.web.dto.*;
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
    @GetMapping("/publisher/library/book/mainChapter")
    public List<ProblemResponseDto> getProblemList(@RequestParam("subChapterId") int subChapterId){
        return problemService.getProblemList(subChapterId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/mainChapter/subChapter/problems")
    public String createProblems (@RequestBody List<ProblemCreateDto> createDtoList){
        return problemService.createProblems(createDtoList);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/mainChapter/subChapter/problem/{problemId}")
    public String updateProblem(@PathVariable int problemId,
                                @RequestBody ProblemUpdateRequestDto requestDto){
        return problemService.updateProblem(problemId, requestDto);
    }
}
