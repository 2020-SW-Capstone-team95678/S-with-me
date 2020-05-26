package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
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
}
