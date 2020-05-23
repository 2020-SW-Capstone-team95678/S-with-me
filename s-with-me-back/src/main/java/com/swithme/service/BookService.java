package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.web.dto.BookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;
    private final PublisherRepository publisherRepository;

    @Transactional
    public BookResponseDto getBookInformation(int bookId){
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

    @Transactional
    public List<BookResponseDto> getBookList(int publisherId) {
        Publisher publisher = publisherRepository.findById(publisherId)
                .orElseThrow(() -> new IllegalArgumentException("해당 publisher가 없습니다. publisherId = " + publisherId));
        List<Book> bookList = bookRepository.findByPublisher(publisher);
        List<BookResponseDto> responseDtoList = new ArrayList<>();
        for(Book book : bookList){
            responseDtoList.add(BookResponseDto.builder()
                    .bookId(book.getBookId())
                    .publisherId(publisherId)
                    .subject(book.getSubject())
                    .price(book.getPrice())
                    .publishedDate(book.getPublishedDate())
                    .name(book.getName())
                    .grade(book.getGrade())
                    .cover(book.getCover())
                    .isAdvertised(book.getIsAdvertised())
                    .totalProblemNumber(book.getTotalProblemNumber())
                    .monthlyProfit(book.getMonthlyProfit())
                    .monthlySold(book.getMonthlySold())
                    .build());
        }
        return responseDtoList;
    }
}
