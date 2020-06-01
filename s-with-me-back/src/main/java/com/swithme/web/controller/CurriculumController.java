package com.swithme.web.controller;

import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.service.CurriculumService;
import com.swithme.web.dto.CurriculumCreateDto;
import com.swithme.web.dto.CurriculumResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CurriculumController {
    private final CurriculumService curriculumService;
    private final CurriculumRepository curriculumRepository;

    @CrossOrigin
    @PostMapping("/student/library/curriculum")
    public int createCurriculum(@RequestBody CurriculumCreateDto curriculumCreateDto){
        return curriculumService.createCurriculum(curriculumCreateDto);
    }

    @CrossOrigin
    @GetMapping("/student/library/curriculum")
    public List<CurriculumResponseDto> getCurriculumList(@RequestParam("studentId") int studentId){
        return curriculumService.getCurriculumList(studentId);
    }

    @CrossOrigin
    @GetMapping("/student/library/curriculum/achievement")
    public int getAchievement(@RequestParam("myBookId") int myBookId){
        return curriculumService.getAchievement(myBookId);
    }
}
