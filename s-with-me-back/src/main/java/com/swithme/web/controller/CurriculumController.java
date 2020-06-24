package com.swithme.web.controller;

import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.service.CurriculumService;
import com.swithme.web.dto.CurriculumCreateDto;
import com.swithme.web.dto.CurriculumResponseDto;
import com.swithme.web.dto.CurriculumUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CurriculumController {
    private final CurriculumService curriculumService;
    @CrossOrigin
    @PostMapping("/student/library/curriculum")
    public int createCurriculum(@RequestBody CurriculumCreateDto curriculumCreateDto){
        return curriculumService.createCurriculum(curriculumCreateDto);
    }

    @CrossOrigin
    @DeleteMapping("/student/library/curriculum/delete")
    public String deleteCurriculum(@RequestParam("curriculumId") int curriculumId)
    {
        return curriculumService.deleteCurriculum(curriculumId);
    }

    @CrossOrigin
    @PutMapping("/student/library/curriculum")
    public String updateCurriculum(@RequestParam("curriculumId") int curriculumId ,
                                   @RequestBody CurriculumUpdateRequestDto curriculumUpdateRequestDto)
    {
        return curriculumService.updateCurriculum(curriculumId, curriculumUpdateRequestDto);
    }

    @CrossOrigin
    @GetMapping("/student/library/curriculum")
    public CurriculumResponseDto getCurriculum(@RequestParam("myBookId") int myBookId)
    {
        return curriculumService.getCurriculum(myBookId);
    }

    @CrossOrigin
    @GetMapping("/student/library/mybook/achievement")
    public int getMyBookAchievement(@RequestParam("myBookId") int myBookId){
        return curriculumService.getMyBookAchievement(myBookId);
    }

    @CrossOrigin
    @GetMapping("/student/library/curriculum/list")
    public List<CurriculumResponseDto> getCurriculumList(@RequestParam("studentId") int studentId){
        return curriculumService.getCurriculumList(studentId);
    }

    @CrossOrigin
    @GetMapping("/student/library/curriculum/achievement")
    public int getAchievement(@RequestParam("myBookId") int myBookId){
        return curriculumService.getAchievement(myBookId);
    }
}