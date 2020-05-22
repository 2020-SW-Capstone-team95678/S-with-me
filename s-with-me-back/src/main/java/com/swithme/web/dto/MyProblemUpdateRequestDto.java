package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyProblemUpdateRequestDto {
    private boolean isConfused;
    private boolean isRight;
    private String mySolution;
    private String myAnswer;
    private Long solvedDateTime;
    private boolean isSolved;

    @Builder
    public MyProblemUpdateRequestDto(boolean isConfused, boolean isRight, String mySolution,
                                     String myAnswer, Long solvedDateTime, boolean isSolved){
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.mySolution = mySolution;
        this.myAnswer = myAnswer;
        this.solvedDateTime = solvedDateTime;
        this.isSolved = isSolved;
    }
}
