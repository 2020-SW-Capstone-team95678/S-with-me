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
    @GetMapping("/student/bookstore/main/{grade}/")
    public List<BookResponseDto> getSwithMePickList(@PathVariable("grade") int grade,String subject){
        return bookStoreService.getSwithMePickList(grade,subject);
    }

    @CrossOrigin
    @GetMapping("/student/bookstore/{grade}/")
    public List<BookResponseDto> getBookStoreADByFilter(@PathVariable("grade") int grade,String subject){
        return bookStoreService.getBookStoreADByFilter(grade,subject);
    }


}
