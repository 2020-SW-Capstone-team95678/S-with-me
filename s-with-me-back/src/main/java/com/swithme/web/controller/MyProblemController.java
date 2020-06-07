package com.swithme.web.controller;

import com.swithme.service.MyProblemService;
import com.swithme.web.dto.MyProblemResponseDto;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import com.swithme.web.dto.MySolutionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;
@RequiredArgsConstructor
@RestController
public class MyProblemController {

    private final MyProblemService myProblemService;

    @CrossOrigin
    @PutMapping("/student/library/my-book/my-problems/{myProblemId}")
    public String updateMyProblem(@PathVariable int myProblemId,
                                  @RequestBody MyProblemUpdateRequestDto requestDto){
        return myProblemService.updateMyProblem(myProblemId, requestDto);
    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/{myBookId}/main-chapter/sub-chapter/{lastSubChapterId}")
    public List<MyProblemResponseDto> getMyProblemList(@PathVariable int myBookId,
                                                       @PathVariable int lastSubChapterId,
                                                       @RequestParam("page") short lastPageNumber) throws SQLException {
        return myProblemService.getMyProblemList(myBookId, lastSubChapterId, lastPageNumber);
    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/{myBookId}/main-chapter/sub-chapter/my-problems")
    public List<MyProblemResponseDto> getMyProblemListInSubChapter(@PathVariable int myBookId, @RequestParam("subChapterId") int subChapterId) throws SQLException {
        return myProblemService.getMyProblemListInSubChapter(myBookId, subChapterId);
    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/my-problem/problem-id")
    public MySolutionResponseDto getMySolution(@RequestParam("myProblemId") int myProblemId) throws SQLException {
        return myProblemService.getMySolution(myProblemId);
    }
}
