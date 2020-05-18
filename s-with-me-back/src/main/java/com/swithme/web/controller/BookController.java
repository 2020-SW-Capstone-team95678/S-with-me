package com.swithme.web.controller;

import com.swithme.service.BookService;
import com.swithme.web.dto.BookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    @CrossOrigin
    @GetMapping("/student/library/my-book")
    public BookResponseDto getBook(@RequestParam("bookId") int bookId){
        return bookService.getBook(bookId);
    }
}
