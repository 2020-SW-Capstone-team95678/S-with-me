package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Clob;

@Getter
@NoArgsConstructor
public class MyProblemUpdateRequestDto {
    private Boolean isConfused;
    private Boolean isRight;
    private String mySolution;
    private String myAnswer;
    private Long solvedDateTime;
    private Boolean isSolved;

    @Builder
    public MyProblemUpdateRequestDto(Boolean isConfused, Boolean isRight, String mySolution,
                                     String myAnswer, Long solvedDateTime, Boolean isSolved){
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.mySolution = mySolution;
        this.myAnswer = myAnswer;
        this.solvedDateTime = solvedDateTime;
        this.isSolved = isSolved;
    }
}
