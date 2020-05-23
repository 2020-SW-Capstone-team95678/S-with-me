package com.swithme.web.controller;

import com.swithme.service.ChapterService;
import com.swithme.web.dto.ChapterResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class ChapterController {

    private final ChapterService chapterService;

    @GetMapping("/student/library/my-book/chapters")
    public List<ChapterResponseDto> getChapterList(@RequestParam int bookId){
        return chapterService.getChapterList(bookId);
    }
}
