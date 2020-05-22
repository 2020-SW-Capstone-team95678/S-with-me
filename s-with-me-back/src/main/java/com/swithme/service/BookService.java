package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.web.dto.BookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    @Transactional
    public BookResponseDto getBook(int bookId){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 book이 없습니다. bookId = " + bookId));
        BookResponseDto responseDto = BookResponseDto.builder()
                .bookId(book.getBookId())
                .publisherId(book.getPublisher().getPublisherId())
                .subject(book.getSubject())
                .price(book.getPrice())
                .publishedDate(book.getPublishedDate())
                .name(book.getName())
                .cover(book.getCover())
                .grade(book.getGrade())
                .isAdvertised(book.getIsAdvertised())
                .totalProblemNumber(book.getTotalProblemNumber())
                .monthlyProfit(book.getMonthlyProfit())
                .monthlySold(book.getMonthlySold())
                .build();
        return responseDto;
    }
}
