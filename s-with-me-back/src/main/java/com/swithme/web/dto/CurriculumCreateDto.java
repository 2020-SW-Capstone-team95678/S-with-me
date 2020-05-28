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
    int myBookId;
    String type;
    int goalNumber;

    @Builder
    public CurriculumCreateDto(int curriculumId, int myBookId, String type,int goalNumber) {
        this.curriculumId = curriculumId;
        this.myBookId = myBookId;
        this.type = type;
        this.goalNumber = goalNumber;
    }
}