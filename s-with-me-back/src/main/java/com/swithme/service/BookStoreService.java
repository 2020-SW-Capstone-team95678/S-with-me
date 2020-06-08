package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.web.dto.BookResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookStoreService {
    private final BookRepository bookRepository;
    @Transactional
    public List<BookResponseDto> getSwithMePickList (int grade,String subject) throws SQLException {
        List<Book> bookList = bookRepository.findAll();
        List<BookResponseDto> bookResponseDtoList = new ArrayList<>();
        if(subject==null) {
            for (Book book : bookList) {
                if (book.getIsAdvertised() == true && book.getGrade() == grade && book.getIsOnSale()==true) {

                    String cover;
                    String introduction;
                    try{ cover = Book.readClobData(book.getCover().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ cover = null; }
                    try{ introduction = Book.readClobData(book.getIntroduction().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ introduction = null; }
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(cover)
                            .grade(book.getGrade())
                            .introduction(introduction)
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
                if (bookResponseDtoList.size() == 4) {
                    break;
                }
            }
        }
        else{
            for (Book book : bookList) {
                if (book.getIsAdvertised() == true && book.getGrade() == grade && book.getSubject().equals(subject) && book.getIsOnSale()==true) {
                    String cover;
                    String introduction;
                    try{ cover = Book.readClobData(book.getCover().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ cover = null; }
                    try{ introduction = Book.readClobData(book.getIntroduction().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ introduction = null; }
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(cover)
                            .grade(book.getGrade())
                            .introduction(introduction)
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
                if (bookResponseDtoList.size() == 4) {
                    break;
                }
            }
        }
        return bookResponseDtoList;
    }

    @Transactional
    public List<BookResponseDto> getSailingBookByFilter(int grade , String subject,int pageNumber) throws SQLException{
        List<Book> bookList = bookRepository.findAll();
        List<BookResponseDto> bookResponseDtoList = new ArrayList<>();
        if(subject==null) {
            for (Book book : bookList) {
                if (book.getIsOnSale() == true && book.getGrade() == grade) {
                    String cover;
                    String introduction;
                    try{ cover = Book.readClobData(book.getCover().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ cover = null; }
                    try{ introduction = Book.readClobData(book.getIntroduction().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ introduction = null; }
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(cover)
                            .grade(book.getGrade())
                            .introduction(introduction)
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
                    String cover;
                    String introduction;
                    try{ cover = Book.readClobData(book.getCover().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ cover = null; }
                    try{ introduction = Book.readClobData(book.getIntroduction().getCharacterStream()); }
                    catch (NullPointerException | IOException exception){ introduction = null; }
                    bookResponseDtoList.add(BookResponseDto.builder()
                            .bookId(book.getBookId())
                            .cover(cover)
                            .grade(book.getGrade())
                            .introduction(introduction)
                            .name(book.getName())
                            .price(book.getPrice())
                            .publishedDate(book.getPublishedDate())
                            .subject(book.getSubject())
                            .build());
                }
            }
        }
        List<BookResponseDto> bookResponseDtoListByPage = new ArrayList<>();
        try{
            bookResponseDtoListByPage = bookResponseDtoList.subList(pageNumber * 8 - 8, pageNumber * 8);
        } catch(IndexOutOfBoundsException indexOutOfBoundsException){
            //subChapter의 마지막 페이지의 경우 문제가 8문제가 아닐 수도 있음.
            bookResponseDtoListByPage = bookResponseDtoList.subList(pageNumber * 8 - 8, bookResponseDtoList.size());
        }
        return bookResponseDtoListByPage;
    }

    @Transactional
    public List<BookResponseDto> getBookListByName(String bookName,int pageNumber) throws SQLException {
        List<Book> bookList = bookRepository.findAll();
        List<BookResponseDto> bookResponseDtoList = new ArrayList<>();
        for(Book book : bookList)
        {
            if(book.getName().contains(bookName))
            {
                String cover;
                String introduction;
                try{ cover = Book.readClobData(book.getCover().getCharacterStream()); }
                catch (NullPointerException | IOException exception){ cover = null; }
                try{ introduction = Book.readClobData(book.getIntroduction().getCharacterStream()); }
                catch (NullPointerException | IOException exception){ introduction = null; }
                bookResponseDtoList.add(BookResponseDto.builder()
                        .bookId(book.getBookId())
                        .cover(cover)
                        .grade(book.getGrade())
                        .introduction(introduction)
                        .name(book.getName())
                        .price(book.getPrice())
                        .publishedDate(book.getPublishedDate())
                        .subject(book.getSubject())
                        .build());
            }
        }
        List<BookResponseDto> bookResponseDtoListByPage = new ArrayList<>();
        try{
            bookResponseDtoListByPage = bookResponseDtoList.subList(pageNumber * 8 - 8, pageNumber * 8);
        } catch(IndexOutOfBoundsException indexOutOfBoundsException){
            //subChapter의 마지막 페이지의 경우 문제가 8문제가 아닐 수도 있음.
            bookResponseDtoListByPage = bookResponseDtoList.subList(pageNumber * 8 - 8, bookResponseDtoList.size());
        }
        return bookResponseDtoListByPage;
    }
}
