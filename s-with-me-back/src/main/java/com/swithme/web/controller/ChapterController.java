package com.swithme.web.controller;

import com.swithme.service.ChapterService;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RequiredArgsConstructor
@RestController
public class ChapterController {

    private final ChapterService chapterService;

    @CrossOrigin
    @GetMapping("/library/book/{bookId}/chapters")
    public List<ChapterResponseDto> getChapterList(@PathVariable int bookId){
        return chapterService.getChapterList(bookId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/mainChapter")
    public int createMainChapter(@RequestBody MainChapterCreateDto createDto){
        return chapterService.createMainChapter(createDto);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/mainChapter/subChapter")
    public int createSubChapter(@RequestBody SubChapterCreateDto createDto){
        return chapterService.createSubChapter(createDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/mainChapter/{mainChapterId}")
    public String updateMainChapter(@PathVariable int mainChapterId,
                                    @RequestBody MainChapterUpdateRequestDto requestDto){
        return chapterService.updateMainChapter(mainChapterId, requestDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/mainChapter/subChapter/{subChapterId}")
    public String updateSubChapter(@PathVariable int subChapterId,
                                   @RequestBody SubChapterUpdateRequestDto requestDto){
        return chapterService.updateSubChapter(subChapterId, requestDto);
    }
}
