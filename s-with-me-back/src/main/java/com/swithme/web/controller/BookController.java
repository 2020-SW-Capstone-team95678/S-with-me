package com.swithme.web.controller;

import com.swithme.service.BookService;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;

@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    @CrossOrigin
    @GetMapping("/student/library/my-book")
    public BookInformationResponseDto getBookInformation(@RequestParam("bookId") int bookId)throws SQLException {
        return bookService.getBookInformation(bookId);
    }

    @CrossOrigin
    @GetMapping("/publisher/library/book/{bookId}")
    public BookResponseDto getBook(@PathVariable int bookId)throws SQLException{
        return bookService.getBook(bookId);
    }
    @CrossOrigin
    @DeleteMapping("/publisher/library/book")
    public String deleteBook(@RequestParam("bookId") int bookId){
        return bookService.deleteBook(bookId);
    }
    @CrossOrigin
    @GetMapping("/student/library/my-book/book-id")
    public BookNameResponseDto getBookName(@RequestParam("myBookId") int myBookId){
        return bookService.getBookName(myBookId);
    }

    @CrossOrigin
    @GetMapping("/publisher/library/book")
    public List<BookInformationResponseDto> getBookList(@RequestParam("publisherId") int publisherId)throws SQLException{
        return bookService.getBookList(publisherId);
    }

    @CrossOrigin
    @PostMapping("/publisher/library/book")
    public int createBook(@RequestBody BookCreateDto createDto)throws SQLException{
        return bookService.createBook(createDto);
    }

    @CrossOrigin
    @PutMapping("/publisher/library/book/{bookId}")
    public String updateBook(@PathVariable int bookId,
                             @RequestBody BookUpdateRequestDto requestDto){
        return bookService.updateBook(bookId, requestDto);
    }

}
