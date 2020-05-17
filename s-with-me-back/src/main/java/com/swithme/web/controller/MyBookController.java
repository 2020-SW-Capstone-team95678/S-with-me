package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.web.dto.ChapterListResponseDto;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MyBookController {

    private final MyBookService myBookService;

    @CrossOrigin
    @GetMapping("/student/library/my-book/{myBookId}")
    public ChapterListResponseDto getChapterList(@PathVariable int myBookId){
        return myBookService.findChapterList(myBookId);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-book/my-problems/{myProblemId}")
    public int updateMyProblem(@PathVariable int myProblemId,
                               @RequestBody MyProblemUpdateRequestDto requestDto){
        return myBookService.updateMyProblem(myProblemId, requestDto);
    }

//    @PutMapping("/student/library/my-book/my-problems")
//    public int updateMyProblem(@RequestBody MyProblemUpdateRequestDto requestDto){
//        return myBookService.updateMyProblem(requestDto);
//    }
}
