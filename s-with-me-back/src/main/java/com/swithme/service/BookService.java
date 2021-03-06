package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;
    private final PublisherRepository publisherRepository;
    private final MyBookRepository myBookRepository;
    private final MainChapterRepository mainChapterRepository;
    private final ChapterService chapterService;

    @Transactional
    public BookInformationResponseDto getBookInformation(int bookId) throws SQLException {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 book이 없습니다. bookId = " + bookId));

        BookInformationResponseDto responseDto = BookInformationResponseDto.builder()
                .bookId(book.getBookId())
                .publisherId(book.getPublisher().getPublisherId())
                .subject(book.getSubject())
                .price(book.getPrice())
                .publishedDate(book.getPublishedDate())
                .name(book.getName())
                .cover(book.getCover())
                .grade(book.getGrade())
                .isAdvertised(book.getIsAdvertised())
                .monthlyProfit(book.getMonthlyProfit())
                .monthlySold(book.getMonthlySold())
                .introduction(book.getIntroduction())
                .build();
        return responseDto;
    }

    @Transactional
    public List<BookInformationResponseDto> getBookList(int publisherId) throws SQLException {
        Publisher publisher = publisherRepository.findById(publisherId)
                .orElseThrow(() -> new IllegalArgumentException("해당 publisher가 없습니다. publisherId = " + publisherId));
        List<Book> bookList = bookRepository.findByPublisher(publisher);
        List<BookInformationResponseDto> responseDtoList = new ArrayList<>();

        if(bookList.size() > 1) Collections.reverse(bookList);

        for(Book book : bookList){
            responseDtoList.add(BookInformationResponseDto.builder()
                    .bookId(book.getBookId())
                    .publisherId(publisherId)
                    .subject(book.getSubject())
                    .price(book.getPrice())
                    .publishedDate(book.getPublishedDate())
                    .name(book.getName())
                    .grade(book.getGrade())
                    .cover(book.getCover())
                    .isOnSale(book.getIsOnSale())
                    .isAdvertised(book.getIsAdvertised())
                    .monthlyProfit(book.getMonthlyProfit())
                    .monthlySold(book.getMonthlySold())
                    .introduction(book.getIntroduction())
                    .build());
        }

        return responseDtoList;
    }

    @Transactional
    public int createBook(BookCreateDto createDto){
        Publisher publisher = publisherRepository.findById(createDto.getPublisherId())
                .orElseThrow(() -> new IllegalArgumentException
                        ("해당 publisher가 없습니다. publisherId = " + createDto.getPublisherId()));

        bookRepository.save(Book.builder()
                .isOnSale(false)
                .isAdvertised(false)
                .publisher(publisher)
                .subject(createDto.getSubject())
                .price(createDto.getPrice())
                .monthlySold(0)
                .monthlyProfit(0)
                .publishedDate(createDto.getPublishedDate())
                .name(createDto.getName())
                .grade(createDto.getGrade())
                .cover(createDto.getCover())
                .introduction(createDto.getIntroduction())
                .build());

        int index = bookRepository.findByPublisher(publisher).size()-1;

        return bookRepository.findByPublisher(publisher).get(index).getBookId();
    }

    @Transactional
    public String updateBook(int bookId, BookUpdateRequestDto requestDto) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 없습니다. bookId = " + bookId));

        book.update(requestDto);

        return "문제집이 수정되었습니다.";
    }

    @Transactional
    public BookResponseDto getBook(int bookId)throws SQLException {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 없습니다. bookId = " + bookId));

        BookResponseDto responseDto = BookResponseDto.builder()
                .bookId(book.getBookId())
                .subject(book.getSubject())
                .price(book.getPrice())
                .name(book.getName())
                .publishedDate(book.getPublishedDate())
                .grade(book.getGrade())
                .cover(book.getCover())
                .introduction(book.getIntroduction())
                .isOnSale(book.getIsOnSale())
                .build();

        return responseDto;
    }

    @Transactional
    public BookNameResponseDto getBookName(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId = " + myBookId));
        Book book = myBook.getBook();

        BookNameResponseDto responseDto = BookNameResponseDto.builder()
                .bookId(book.getBookId())
                .bookName(book.getName())
                .build();

        return responseDto;
    }
    @Transactional
    public String deleteBook(int bookId){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 Book이 없습니다. bookId = "+bookId));
        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        for(MainChapter mainChapter : mainChapterList)
        {
            chapterService.deleteMainChapter(mainChapter.getMainChapterId());
        }
        bookRepository.delete(book);
        return "책 삭제 완료. bookId = "+bookId;
    }

    @Scheduled(cron = "0 0 0 1 * *")
    @Transactional
    public void cleanUpMonthlyProfitAndSold(){
        List<Book> bookList = bookRepository.findAll();
        for(Book book : bookList)
            book.cleanUpMonthlyProfitAndSold();
    }
}
