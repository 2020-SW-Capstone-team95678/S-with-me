package com.swithme.web.controller;

import com.swithme.service.MyBookService;
import com.swithme.service.MyProblemService;
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
    private final MyProblemService myProblemService;

    @CrossOrigin
    @GetMapping("student/library/my-book/getMyBook")
    public MyBookResponseDto getMyBook(@RequestParam("myBookId") int myBookId){
        return myBookService.getMyBook(myBookId);
    }

    @CrossOrigin
    @GetMapping("/student/library")
    public List<MyBookResponseDto> getMyBookList(@RequestParam("studentId") int studentId){
        return myBookService.findMyBookList(studentId);

    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/folderFilter")
    public List<MyBookResponseDto> getMyBookListFilteredByFolder(@RequestParam("folderId") int folderId){
        return myBookService.findMyBookListFilteredByFolder(folderId);
    }

    @CrossOrigin
    @PostMapping("/student/library/my-book")
    public String createMyBook(@RequestBody MyBookCreateDto myBookCreateDto){
        int createdMyBookId = myBookService.createMyBook(myBookCreateDto);
        return myProblemService.createMyProblems(createdMyBookId);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-book/{myBookId}")
    public String bringUpToDate(@PathVariable int myBookId,
                                 @RequestBody MyBookUpdateRequestDto requestDto){
        return myBookService.bringUpToDate(myBookId, requestDto);
    }

    @CrossOrigin
    @PutMapping("/student/library/my-book/{myBookId}/folder")
    public int updateFolder(@PathVariable int myBookId,
                            @RequestBody MybookFolderUpdateRequestDto requestDto){
        return myBookService.updateFolder(myBookId, requestDto);
    }

    @CrossOrigin
    @DeleteMapping("/student/library/my-book/{myBookId}")
    public String deleteMyBook(@PathVariable int myBookId){
        return myBookService.deleteMyBook(myBookId);
    }
}
