package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.web.dto.ChapterListResponseDto;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MyBookController {

    private final MyBookService myBookService;

    @CrossOrigin
    @GetMapping("/student/library/my-book/{myBookId}/chapters")
    public ChapterListResponseDto getChapterList(@PathVariable int myBookId){
        return myBookService.findChapterList(myBookId);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-book/{myBookId}")
    public int updatePageNumber(@PathVariable int myBookId,
                                @RequestBody MyBookUpdateRequestDto requestDto){
        return myBookService.updatePageNumber(myBookId, requestDto);
    }
}
