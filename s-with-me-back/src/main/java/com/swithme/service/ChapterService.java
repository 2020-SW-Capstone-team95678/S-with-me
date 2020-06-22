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
        if(!mainChapterList.isEmpty()) {
            if(mainChapterList.size() > 1) Collections.sort(mainChapterList);
            for (MainChapter mainChapter : mainChapterList) {
                MainChapterResponseDto mainChapterResponseDto = MainChapterResponseDto.builder()
                        .mainChapterId(mainChapter.getMainChapterId())
                        .mainChapterName(mainChapter.getMainChapterName())
                        .build();

                List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
                if(!subChapterList.isEmpty()) {
                    if(subChapterList.size() > 1) Collections.sort(subChapterList);
                    List<SubChapterResponseDto> subChapterResponseDtoList = new ArrayList<>();
                    for (SubChapter subChapter : subChapterList) {
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
                else responseDtoList.add(ChapterResponseDto.builder()
                        .mainChapterResponseDto(mainChapterResponseDto)
                        .subChapterResponseDtoList(new ArrayList<>())
                        .build());
            }
        }
        else responseDtoList.add(ChapterResponseDto.builder()
                .mainChapterResponseDto(new MainChapterResponseDto())
                .subChapterResponseDtoList(new ArrayList<>())
                .build());
        return responseDtoList;
    }

    @Transactional
    public List<ChapterResponseDto> getMyBookChapterList(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId = " + myBookId));
        Book book = myBook.getBook();
        List<ChapterResponseDto> responseDtoList = new ArrayList<>();

        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        if(mainChapterList.size() > 1) Collections.sort(mainChapterList);
        for(MainChapter mainChapter : mainChapterList){
            MainChapterResponseDto mainChapterResponseDto = MainChapterResponseDto.builder()
                    .mainChapterId(mainChapter.getMainChapterId())
                    .mainChapterName(mainChapter.getMainChapterName())
                    .build();

            List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
            if(subChapterList.size() > 1) Collections.sort(subChapterList);
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

        if(mainChapterRepository.findByBook(book).isEmpty()) {
            mainChapterRepository.save(MainChapter.builder()
                    .book(book)
                    .mainChapterName(createDto.getMainChapterName())
                    .beforeMainChapterId(0)
                    .build());
        }
        else{
            List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
            int last = mainChapterList.size() - 1;
            MainChapter lastMainChapter = mainChapterList.get(last);

            mainChapterRepository.save(MainChapter.builder()
                    .book(book)
                    .mainChapterName(createDto.getMainChapterName())
                    .beforeMainChapterId(lastMainChapter.getMainChapterId())
                    .build());
        }

        int last = mainChapterRepository.findByBook(book).size() - 1;

        return mainChapterRepository.findByBook(book).get(last).getMainChapterId();
    }

    @Transactional
    public int createSubChapter(SubChapterCreateDto createDto) {
        MainChapter mainChapter = mainChapterRepository.findById(createDto.getMainChapterId())
                .orElseThrow(() -> new IllegalArgumentException
                        ("해당 main chapter가 없습니다. mainChapterId = " + createDto.getMainChapterId()));

        if(subChapterRepository.findByMainChapter(mainChapter).isEmpty()) {
            subChapterRepository.save(SubChapter.builder()
                    .mainChapter(mainChapter)
                    .subChapterName(createDto.getSubChapterName())
                    .beforeSubChapterId(0)
                    .build());
        }
        else{
            List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
            int last = subChapterList.size() - 1;
            SubChapter lastSubChapter = subChapterList.get(last);

            subChapterRepository.save(SubChapter.builder()
                    .mainChapter(mainChapter)
                    .subChapterName(createDto.getSubChapterName())
                    .beforeSubChapterId(lastSubChapter.getSubChapterId())
                    .build());
        }

        int last = subChapterRepository.findByMainChapter(mainChapter).size() - 1;

        return subChapterRepository.findByMainChapter(mainChapter).get(last).getSubChapterId();
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
    public String deleteMainChapter(int mainChapterId) {
        MainChapter mainChapter = mainChapterRepository.findById(mainChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 대단원이 없습니다. mainChapterId = " + mainChapterId));
        String mainChapterName = mainChapter.getMainChapterName();
        Book book = mainChapter.getBook();


        MainChapter beforeMainChapter = null;
        if(mainChapter.getBeforeMainChapterId() != 0) {
            beforeMainChapter = mainChapterRepository.findById(mainChapter.getBeforeMainChapterId())
                    .orElseThrow(() -> new IllegalArgumentException("이전 대단원이 없습니다."));
        }
        MainChapter afterMainChapter = mainChapterRepository.findByBeforeMainChapterId(mainChapterId);

        List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
        if(!subChapterList.isEmpty()){
            for (SubChapter subChapter : subChapterList) {
                List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
                problemRepository.deleteAll(problemList);
                subChapterRepository.delete(subChapter);
            }
        }

        mainChapterRepository.delete(mainChapter);
        if(!mainChapterRepository.findByBook(book).isEmpty()) {
            //가장 앞을 삭제한 경우
            if(beforeMainChapter == null && afterMainChapter != null)
                afterMainChapter.update(0);
                //가장 뒤를 삭제한 경우
            else if(afterMainChapter == null);
                //나머지 경우
            else
                afterMainChapter.update(beforeMainChapter.getMainChapterId());
        }

        return mainChapterName + " 대단원과 해당 대단원에 포함된 소단원, 문제가 모두 삭제되었습니다.";
    }

    @Transactional
    public String deleteSubChapter(int subChapterId) {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + subChapterId));
        String subChapterName = subChapter.getSubChapterName();
        MainChapter mainChapter = subChapter.getMainChapter();


        SubChapter beforeSubChapter = null;
        if(subChapter.getBeforeSubChapterId() != 0) {
            beforeSubChapter = subChapterRepository.findById(subChapter.getBeforeSubChapterId())
                    .orElseThrow(() -> new IllegalArgumentException("이전 소단원이 없습니다."));
        }
        SubChapter afterSubChapter = subChapterRepository.findByBeforeSubChapterId(subChapterId);

        List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
        if(!problemList.isEmpty()) problemRepository.deleteAll(problemList);
        subChapterRepository.delete(subChapter);

        if(!subChapterRepository.findByMainChapter(mainChapter).isEmpty()) {
            //가장 앞을 삭제한 경우
            if(beforeSubChapter == null && afterSubChapter != null)
                afterSubChapter.update(0);
                //가장 뒤를 삭제한 경우
            else if(afterSubChapter == null);
                //나머지 경우
            else
                afterSubChapter.update(beforeSubChapter.getSubChapterId());
        }

        return subChapterName + " 소단원과 해당 소단원에 포함된 문제가 모두 삭제되었습니다.";
    }

    @Transactional
    public List<MainChapterResponseDto> getMainChapters(int bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 없습니다 bookId = " + bookId));
        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        List<MainChapterResponseDto> responseDtoList = new ArrayList<>();

        for(MainChapter mainChapter : mainChapterList){
            MainChapterResponseDto responseDto = MainChapterResponseDto.builder()
                    .mainChapterId(mainChapter.getMainChapterId())
                    .mainChapterName(mainChapter.getMainChapterName())
                    .build();
            responseDtoList.add(responseDto);
        }

        return  responseDtoList;
    }
}
