package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyProblemResponseDto {

    private int myProblemId;
    private int myBookId;
    private int problemId;
    private String mySolution;
    private String myAnswer;
    private boolean isConfused;
    private boolean isRight;
    private Long solvedDateTime;

    @Builder
    public MyProblemResponseDto(int myProblemId, int myBookId, int problemId, String mySolution,
                                boolean isConfused, boolean isRight, Long solvedDateTime, String myAnswer){
        this.myProblemId = myProblemId;
        this.myBookId = myBookId;
        this.problemId = problemId;
        this.mySolution = mySolution;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
    }
}
