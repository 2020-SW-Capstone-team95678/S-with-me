package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CurriculumResponseDto {
    private int curriculumId;
    private int myBookId;
    private String type;
    private int goalNumber;

    @Builder
    public CurriculumResponseDto(int curriculumId,int myBookId,String type,int goalNumber) {
        this.curriculumId = curriculumId;
        this.myBookId = myBookId;
        this.type = type;
        this.goalNumber = goalNumber;
    }
}
