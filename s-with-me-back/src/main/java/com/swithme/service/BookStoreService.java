package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.web.dto.BookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookStoreService {
    private final BookRepository bookRepository;
    @Transactional
    public List<BookResponseDto> getSwithMePickList(int grade,String subject){
        List<Book> bookList = bookRepository.findAll();
        List<BookResponseDto> bookResponseDtoList = new ArrayList<>();
        if(subject==null) {
            for (Book book : bookList) {
                if (book.getIsAdvertised() == true && book.getGrade() == grade && book.getIsOnSale()==true) {
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(book.getCover())
                            .grade(book.getGrade())
                            .introduction(book.getIntroduction())
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
                if (bookResponseDtoList.size() == 5) {
                    break;
                }
            }
        }
        else{
            for (Book book : bookList) {
                if (book.getIsAdvertised() == true && book.getGrade() == grade && book.getSubject().equals(subject) && book.getIsOnSale()==true) {
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(book.getCover())
                            .grade(book.getGrade())
                            .introduction(book.getIntroduction())
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
                if (bookResponseDtoList.size() == 5) {
                    break;
                }
            }
        }
        return bookResponseDtoList;
    }

    @Transactional
    public List<BookResponseDto> getSailingBookByFilter(int grade , String subject){
        List<Book> bookList = bookRepository.findAll();
        List<BookResponseDto> bookResponseDtoList = new ArrayList<>();
        if(subject==null) {
            for (Book book : bookList) {
                if (book.getIsOnSale() == true && book.getGrade() == grade) {
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(book.getCover())
                            .grade(book.getGrade())
                            .introduction(book.getIntroduction())
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
            }
        }
        else{
            for (Book book : bookList) {
                if (book.getIsOnSale() == true && book.getGrade() == grade && book.getSubject().equals(subject)) {
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(book.getCover())
                            .grade(book.getGrade())
                            .introduction(book.getIntroduction())
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
            }
        }
        return bookResponseDtoList;
    }

    @Transactional
    public List<BookResponseDto> getBookListByName(String bookName){
        List<Book> bookList = bookRepository.findAll();
        List<BookResponseDto> bookResponseDtoList = new ArrayList<>();
        for(Book book : bookList)
        {
            if(book.getName().contains(bookName))
            {
                bookResponseDtoList.add(BookResponseDto.builder()
                        .bookId(book.getBookId())
                        .cover(book.getCover())
                        .grade(book.getGrade())
                        .introduction(book.getIntroduction())
                        .name(book.getName())
                        .price(book.getPrice())
                        .publishedDate(book.getPublishedDate())
                        .subject(book.getSubject())
                        .build());
            }
        }
        return bookResponseDtoList;
    }
}
