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
    private final MyProblemRepository myProblemRepository;

    @Transactional
    public ChapterListResponseDto findChapterList(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        Book book = myBook.getBook();
        List<Chapter> chapterList = chapterRepository.findByBook(book);

        return new ChapterListResponseDto(chapterList);
    }

    @Transactional
    public int updateMyProblem(int myProblemId, MyProblemUpdateRequestDto requestDto) {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemID=" + myProblemId));
        myProblem.update(requestDto);
        return myProblemId;
    }

//    @Transactional
//    public int updateMyProblem(MyProblemUpdateRequestDto requestDto){
//        List<MyProblem> myProblemToUpdateList = requestDto.getMyProblemList();
//        for(MyProblem myProblemToUpdate : myProblemToUpdateList){
//            MyProblem myProblem = myProblemRepository.findById(myProblemToUpdate.getMyProblemId())
//                    .orElseThrow(() -> new IllegalArgumentException
//                            ("해당 my problem이 없습니다. myProblemId=" + myProblemToUpdate.getMyProblemId()));
//            myProblem.update(myProblemToUpdate);
//        }
//        return 1;
//    }
}
