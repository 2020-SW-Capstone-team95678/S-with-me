package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CurriculumCreateDto {
    int curriculumId;
    int subChapterId;
    int myBookId;
    String type;
    int dailyGoal;
    String monthlyGoal;

    @Builder
    public CurriculumCreateDto(int curriculumId,int subChapterId, int myBookId, String type,int dailyGoal,String monthlyGoal) {
        this.curriculumId = curriculumId;
        this.subChapterId = subChapterId;
        this.myBookId = myBookId;
        this.type = type;
        this.dailyGoal = dailyGoal;
        this.monthlyGoal = monthlyGoal;
    }
}