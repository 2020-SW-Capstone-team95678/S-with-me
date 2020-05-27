package com.swithme.web.controller;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.service.MyBookService;
import com.swithme.web.dto.MyBookCreateDto;
import com.swithme.web.dto.MyBookResponseDto;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import com.swithme.web.dto.MybookFolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MyBookController {

    private final MyBookService myBookService;
    private final MyBookRepository myBookRepository;

    /*@CrossOrigin
    @GetMapping("student/library/my-book/getMyBook")
    public MyBook getMyBook(int myBookId){
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("my book이 없습니다."));
        return myBook;
    }*/

    @CrossOrigin
    @GetMapping("/student/library")
    public List<MyBookResponseDto> getMyBookList(@RequestParam("studentId") int studentId){
        return myBookService.findMyBookList(studentId);

    }

    @CrossOrigin
    @PostMapping("/student/library/my-book")
    public String createMyBook(@RequestBody MyBookCreateDto myBookCreateDto){
        return myBookService.createMyBook(myBookCreateDto);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-book/{myBookId}/lastPageNumber")
    public String updateLastPageNumber(@PathVariable int myBookId,
                                       @RequestBody MyBookUpdateRequestDto requestDto){
        return myBookService.updateLastPageNumber(myBookId, requestDto);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-book/{mybookId}/folder")
    public int updateFolder(@PathVariable int myBookId,
                            @RequestBody MybookFolderUpdateRequestDto requestDto){
        return myBookService.updateFolder(myBookId, requestDto);
    }
}
