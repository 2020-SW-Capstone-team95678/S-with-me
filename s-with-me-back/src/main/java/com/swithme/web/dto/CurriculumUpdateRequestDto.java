package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CurriculumUpdateRequestDto {
    private int myBookId;
    private String monthlyGoal;
    private int subChapterId;
    private int dailyGoal;
    private String type;

    @Builder
    public CurriculumUpdateRequestDto(int myBookId, String type,String monthlyGoal,int subChapterId,int dailyGoal) {
        this.myBookId = myBookId;
        this.type = type;
        this.monthlyGoal = monthlyGoal;
        this.subChapterId = subChapterId;
        this.dailyGoal = dailyGoal;
    }
}