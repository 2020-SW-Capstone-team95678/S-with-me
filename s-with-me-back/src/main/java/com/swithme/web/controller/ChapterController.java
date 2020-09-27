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
    @GetMapping("/student/library/my-book/chapters")
    public List<ChapterResponseDto> getMyBookChapterList(@RequestParam("myBookId") int myBookId){
        return chapterService.getMyBookChapterList(myBookId);
    }

    @CrossOrigin
    @GetMapping("/publisher/library/book/{bookId}/main-chapters")
    public List<MainChapterResponseDto> getMainChapters(@PathVariable int bookId){
        return chapterService.getMainChapters(bookId);
    }

    @CrossOrigin
    @GetMapping("/publisher/library/book/main-chapter/{mainChapterId}/sub-chapters")
    public List<SubChapterResponseDto> getSubChapters(@PathVariable int mainChapterId){
        return chapterService.getSubChapters(mainChapterId);
    }

    @CrossOrigin
    @GetMapping("/library/book")
    public String getSubChapterName(@RequestParam int subChapterId)
    {
        return chapterService.getSubChapterName(subChapterId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/main-chapter")
    public int createMainChapter(@RequestBody MainChapterCreateDto createDto){
        return chapterService.createMainChapter(createDto);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book/main-chapter/sub-chapter")
    public int createSubChapter(@RequestBody SubChapterCreateDto createDto){
        return chapterService.createSubChapter(createDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/main-chapter/{mainChapterId}")
    public String updateMainChapter(@PathVariable int mainChapterId,
                                    @RequestBody MainChapterUpdateRequestDto requestDto){
        return chapterService.updateMainChapter(mainChapterId, requestDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/main-chapter/sub-chapter/{subChapterId}")
    public String updateSubChapter(@PathVariable int subChapterId,
                                   @RequestBody SubChapterUpdateRequestDto requestDto){
        return chapterService.updateSubChapter(subChapterId, requestDto);
    }

    @CrossOrigin
    @DeleteMapping("/publisher/library/book/main-chapter/{mainChapterId}")
    public String deleteMainChapter(@PathVariable int mainChapterId){
        return chapterService.deleteMainChapter(mainChapterId);
    }

    @CrossOrigin
    @DeleteMapping("/publisher/library/book/main-chapter/sub-chapter/{subChapterId}")
    public String deleteSubChapter(@PathVariable int subChapterId){
        return chapterService.deleteSubChapter(subChapterId);
    }
}
