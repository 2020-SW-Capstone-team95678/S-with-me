package com.swithme.web.controller;

import com.swithme.service.MyProblemService;
import com.swithme.web.dto.MyProblemResponseDto;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/student/library/my-book/main-chapter/sub-chapter/{lastSubChapterId}")
    public List<MyProblemResponseDto> getMyProblemList(@PathVariable int lastSubChapterId,
                                                       @RequestParam("page") short lastPageNumber){
        return myProblemService.getMyProblemList(lastSubChapterId, lastPageNumber);
    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/main-chapter/sub-chapter/my-problems")
    public List<MyProblemResponseDto> getMyProblemListInSubChapter(@RequestParam("subChapterId") int subChapterId){
        return myProblemService.getMyProblemListInSubChapter(subChapterId);
    }

//    @PutMapping("/student/library/my-book/my-problems")
//    public int updateMyProblem(@RequestBody MyProblemUpdateRequestDto requestDto){
//        return myBookService.updateMyProblem(requestDto);
//    }
}
