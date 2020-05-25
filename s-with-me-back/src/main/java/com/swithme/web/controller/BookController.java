package com.swithme.web.controller;

import com.swithme.service.BookService;
import com.swithme.web.dto.BookInformationResponseDto;
import com.swithme.web.dto.BookSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    @CrossOrigin
    @GetMapping("/student/library/my-book")
    public BookInformationResponseDto getBookInformation(@RequestParam("bookId") int bookId){
        return bookService.getBookInformation(bookId);
    }

    @CrossOrigin
    @GetMapping("/publisher/library")
    public List<BookInformationResponseDto> getBookList(@RequestParam("publisherId") int publisherId){
        return bookService.getBookList(publisherId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book")
    public String saveBook(@RequestBody BookSaveRequestDto bookSaveRequestDto){
        return bookService.saveBook(bookSaveRequestDto);
    }

}
