package com.swithme.web.controller;

import com.swithme.domain.book.BookRepository;
import com.swithme.service.BookService;
import com.swithme.service.BookStoreService;
import com.swithme.web.dto.BookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BookStoreController {
    private final BookStoreService bookStoreService;

    @CrossOrigin
    @GetMapping("/student/bookstore/s-with-me-pick/{grade}")
    public List<BookResponseDto> getSwithMePickList(@PathVariable("grade") int grade,String subject){
        return bookStoreService.getSwithMePickList(grade,subject);
    }

    @CrossOrigin
    @GetMapping("/student/bookstore/{grade}")
    public List<BookResponseDto> getSailingBookByFilter(@PathVariable("grade") int grade,String subject){
        return bookStoreService.getSailingBookByFilter(grade,subject);
    }
    @CrossOrigin
    @GetMapping("/student/bookstore")
    public List<BookResponseDto> getBookListByName(@RequestParam("bookName") String bookName) {
        return bookStoreService.getBookListByName(bookName);
    }
}
