package com.swithme.web.controller;

import com.swithme.service.BookService;
import com.swithme.web.dto.*;
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
    @GetMapping("/publisher/library/book/{bookId}")
    public BookResponseDto getBook(@PathVariable int bookId){
        return bookService.getBook(bookId);
    }

    @CrossOrigin
    @GetMapping("/student/library/my-book/book-id")
    public int getBookId(@RequestParam("myBookId") int myBookId){
        return bookService.getBookId(myBookId);
    }

    @CrossOrigin
    @GetMapping("/publisher/library/book")
    public List<BookInformationResponseDto> getBookList(@RequestParam("publisherId") int publisherId){
        return bookService.getBookList(publisherId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book")
    public int createBook(@RequestBody BookCreateDto createDto){
        return bookService.createBook(createDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/{bookId}")
    public String updateBook(@PathVariable int bookId,
                             @RequestBody BookUpdateRequestDto requestDto){
        return bookService.updateBook(bookId, requestDto);
    }

}
