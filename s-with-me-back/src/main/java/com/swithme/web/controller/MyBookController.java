package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.web.dto.ChapterListResponseDto;
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
}
