package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
@RequiredArgsConstructor
@Service
public class ChapterService {

    private final MainChapterRepository mainChapterRepository;
    private final SubChapterRepository subChapterRepository;
    private final BookRepository bookRepository;
    private final MyBookRepository myBookRepository;
    private final ProblemRepository problemRepository;

    @Transactional
    public String getSubChapterName(int subChapterId)
    {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 챕터가 없습니다. bookId = " ));
        return subChapter.getSubChapterName();
    }

    @Transactional
    public List<ChapterResponseDto> getChapterList(int bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 book이 없습니다. bookId = " + bookId));
        List<ChapterResponseDto> responseDtoList = new ArrayList<>();

        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        for(MainChapter mainChapter : mainChapterList){
            MainChapterResponseDto mainChapterResponseDto = MainChapterResponseDto.builder()
                    .mainChapterId(mainChapter.getMainChapterId())
                    .mainChapterName(mainChapter.getMainChapterName())
                    .build();

            List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
            List<SubChapterResponseDto> subChapterResponseDtoList = new ArrayList<>();
            for(SubChapter subChapter : subChapterList){
                subChapterResponseDtoList.add(SubChapterResponseDto.builder()
                        .mainChapterId(mainChapter.getMainChapterId())
                        .subChapterId(subChapter.getSubChapterId())
                        .subChapterName(subChapter.getSubChapterName())
                        .build());
            }

            responseDtoList.add(ChapterResponseDto.builder()
                    .mainChapterResponseDto(mainChapterResponseDto)
                    .subChapterResponseDtoList(subChapterResponseDtoList)
                    .build());
        }
        return responseDtoList;
    }

    @Transactional
    public List<ChapterResponseDto> getMyBookChapterList(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId = " + myBookId));
        Book book = myBook.getBook();
        List<ChapterResponseDto> responseDtoList = new ArrayList<>();

        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        for(MainChapter mainChapter : mainChapterList){
            MainChapterResponseDto mainChapterResponseDto = MainChapterResponseDto.builder()
                    .mainChapterId(mainChapter.getMainChapterId())
                    .mainChapterName(mainChapter.getMainChapterName())
                    .build();

            List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
            List<SubChapterResponseDto> subChapterResponseDtoList = new ArrayList<>();
            for(SubChapter subChapter : subChapterList){
                subChapterResponseDtoList.add(SubChapterResponseDto.builder()
                        .mainChapterId(mainChapter.getMainChapterId())
                        .subChapterId(subChapter.getSubChapterId())
                        .subChapterName(subChapter.getSubChapterName())
                        .build());
            }

            responseDtoList.add(ChapterResponseDto.builder()
                    .mainChapterResponseDto(mainChapterResponseDto)
                    .subChapterResponseDtoList(subChapterResponseDtoList)
                    .build());
        }
        return responseDtoList;
    }

    @Transactional
    public int createMainChapter(MainChapterCreateDto createDto) {
        Book book = bookRepository.findById(createDto.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 book이 없습니다. bookId = " + createDto.getBookId()));
        mainChapterRepository.save(MainChapter.builder()
                .book(book)
                .mainChapterName(createDto.getMainChapterName())
                .build());
        int index = mainChapterRepository.findByBook(book).size() - 1;
        return mainChapterRepository.findByBook(book).get(index).getMainChapterId();
    }

    @Transactional
    public int createSubChapter(SubChapterCreateDto createDto) {
        MainChapter mainChapter = mainChapterRepository.findById(createDto.getMainChapterId())
                .orElseThrow(() -> new IllegalArgumentException
                        ("해당 main chapter가 없습니다. mainChapterId = " + createDto.getMainChapterId()));
        subChapterRepository.save(SubChapter.builder()
                .mainChapter(mainChapter)
                .subChapterName(createDto.getSubChapterName())
                .build());
        int index = subChapterRepository.findByMainChapter(mainChapter).size() - 1;
        return subChapterRepository.findByMainChapter(mainChapter).get(index).getSubChapterId();
    }

    @Transactional
    public String updateMainChapter(int mainChapterId, MainChapterUpdateRequestDto requestDto) {
        MainChapter mainChapter = mainChapterRepository.findById(mainChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 대단원이 없습니다. mainChapterId = " + mainChapterId));
        mainChapter.update(requestDto);
        return "대단원이 수정되었습니다.";
    }

    @Transactional
    public String updateSubChapter(int subChapterId, SubChapterUpdateRequestDto requestDto) {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + subChapterId));
        MainChapter mainChapter = mainChapterRepository.findById(requestDto.getMainChapterId())
                .orElseThrow(() -> new IllegalArgumentException("해당 대단원이 없습니다. mainChapterId = " + requestDto.getMainChapterId()));
        subChapter.update(mainChapter, requestDto);
        return "소단원이 수정되었습니다.";
    }

    @Transactional
    public String deleteSubChapter(int subChapterId) {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + subChapterId));
        String subChapterName = subChapter.getSubChapterName();

        List<Problem> problemList = problemRepository.findBySubChapter(subChapter);

        problemRepository.deleteAll(problemList);
        subChapterRepository.delete(subChapter);
        return subChapterName + " 소단원과 해당 소단원에 포함된 문제가 모두 삭제되었습니다.";
    }

}
