package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.web.dto.MyBookUpdateRequestDto;
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
}
