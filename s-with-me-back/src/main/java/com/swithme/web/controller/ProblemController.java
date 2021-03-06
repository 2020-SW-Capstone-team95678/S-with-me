package com.swithme.web.controller;

import com.swithme.service.ProblemService;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;
@RequiredArgsConstructor
@RestController
public class ProblemController {

    private final ProblemService problemService;

    @CrossOrigin
    @GetMapping("/student/library/my-book/my-problems")
    public ProblemResponseDto getProblem(@RequestParam("problemId") int problemId) throws SQLException {
        return problemService.findById(problemId);
    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/main-chapter/sub-chapter/{lastSubChapterId}")
    public List<AnswerResponseDto> getAnswerList(@PathVariable int lastSubChapterId,
                                                 @RequestParam("page") short lastPageNumber){
        return problemService.getAnswerList(lastSubChapterId, lastPageNumber);
    }

    @CrossOrigin
    @GetMapping("/publisher/library/book/main-chapter")
    public List<ProblemResponseDto> getProblemList(@RequestParam("subChapterId") int subChapterId) throws SQLException {
        return problemService.getProblemList(subChapterId);
    }


    @CrossOrigin
    @PostMapping("/publisher/library/book/main-chapter/sub-chapter/problem")
    public int createProblem (@RequestBody ProblemCreateDto createDto){
        return problemService.createProblem(createDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/main-chapter/sub-chapter/problem/{problemId}")
    public String updateProblem(@PathVariable int problemId,
                                @RequestBody ProblemUpdateRequestDto requestDto){
        return problemService.updateProblem(problemId, requestDto);
    }

    @CrossOrigin
    @DeleteMapping("/publisher/library/book/main-chapter/sub-chapter/problem/{problemId}")
    public String deleteProblem(@PathVariable int problemId){
        return problemService.deleteProblem(problemId);
    }
}
