package com.swithme.service;


import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.web.dto.CurriculumCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CurriculumService {

    private final MyBookRepository myBookRepository;
    private final CurriculumRepository curriculumRepository;
    @Transactional
    public int createCurriculum(CurriculumCreateDto curriculumCreateDto){
        MyBook myBook=myBookRepository.findById(curriculumCreateDto.getMyBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 존재하지 않습니다."));
        curriculumRepository.save(Curriculum.builder()
                .goalNumber(curriculumCreateDto.getGoalNumber())
                .myBook(myBook)
                .type(curriculumCreateDto.getType())
                .build());
        return myBook.getMyBookId();
    }
}
