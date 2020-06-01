package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CurriculumResponseDto {
    private int curriculumId;
    private int subChapterId;
    private int myBookId;
    private String type;
    private int dailyGoal;
    private String monthlyGoal;

    @Builder
    public CurriculumResponseDto(int curriculumId,int subChapterId,int myBookId,String type,int dailyGoal,String monthlyGoal) {
        this.curriculumId = curriculumId;
        this.subChapterId = subChapterId;
        this.myBookId = myBookId;
        this.type = type;
        this.dailyGoal = dailyGoal;
        this.monthlyGoal = monthlyGoal;
    }
}
