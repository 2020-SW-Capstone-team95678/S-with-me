package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.chapter.Chapter;
import com.swithme.domain.chapter.ChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.web.dto.ChapterListResponseDto;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
@RequiredArgsConstructor
@Service
public class MyBookService {

    private final MyBookRepository myBookRepository;
    private final ChapterRepository chapterRepository;

    @Transactional
    public ChapterListResponseDto findChapterList(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        Book book = myBook.getBook();
        List<Chapter> chapterList = chapterRepository.findByBook(book);
        Chapter.sort(chapterList);

        return new ChapterListResponseDto(chapterList);
    }
}
