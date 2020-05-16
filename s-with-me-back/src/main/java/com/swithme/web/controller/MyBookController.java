package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.web.dto.ChapterListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MyBookController {

    private final MyBookService myBookService;

    @GetMapping("/student/library/my-book/{myBookId}")
    public ChapterListResponseDto getChapterList(@PathVariable int myBookId){
        return myBookService.findChapterList(myBookId);
    }
}
