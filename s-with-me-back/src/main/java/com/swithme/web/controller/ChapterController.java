package com.swithme.web.controller;

import com.swithme.service.ChapterService;
import com.swithme.web.dto.ChapterResponseDto;
import com.swithme.web.dto.MainChapterCreateDto;
import com.swithme.web.dto.SubChapterCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class ChapterController {

    private final ChapterService chapterService;

    @CrossOrigin
    @GetMapping("/student/library/my-book/chapters")
    public List<ChapterResponseDto> getChapterList(@RequestParam int bookId){
        return chapterService.getChapterList(bookId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/mainChapter")
    public String createMainChapter(@RequestBody MainChapterCreateDto createDto){
        return chapterService.createMainChapter(createDto);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/subChapter")
    public String createSubChapter(@RequestBody SubChapterCreateDto createDto){
        return chapterService.createSubChapter(createDto);
    }
}
