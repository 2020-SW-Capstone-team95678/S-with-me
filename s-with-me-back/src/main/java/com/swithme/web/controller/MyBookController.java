package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import com.swithme.web.dto.MybookFolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MyBookController {

    private final MyBookService myBookService;

    @CrossOrigin
    @PutMapping("/student/library/my-book/{myBookId}")
    public String updateProblemNumber(@PathVariable int myBookId,
                                      @RequestBody MyBookUpdateRequestDto requestDto){
        return myBookService.updateLastProblemNumber(myBookId, requestDto);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-boool/{mybookId}")
    public int updateFolder(@PathVariable int myBookId,
                               @RequestBody MybookFolderUpdateRequestDto requestDto){
        return myBookService.updateFolder(myBookId, requestDto);
    }
}
