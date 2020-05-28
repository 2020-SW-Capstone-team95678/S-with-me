package com.swithme.web.controller;

import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.service.CurriculumService;
import com.swithme.web.dto.CurriculumCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CurriculumController {
    private final CurriculumService curriculumService;
    private final CurriculumRepository curriculumRepository;
    @PostMapping("/student/library/curriculum")
    public int createCurriculum(@RequestBody CurriculumCreateDto curriculumCreateDto){
        return curriculumService.createCurriculum(curriculumCreateDto);
    }

    @GetMapping("/student/library/curriculum")
    public Curriculum getCurriculum(int curriculumId){
        return curriculumRepository.findById(curriculumId)
                .orElseThrow(() -> new IllegalArgumentException("해당 커리큘럼이 존재하지 않습니다."));
    }
}
