package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Clob;

@Getter
@NoArgsConstructor
public class MyProblemResponseDto {

    private int myProblemId;
    private int myBookId;
    private int problemId;
    private String mySolution;
    private String myAnswer;
    private Boolean isConfused;
    private Boolean isRight;
    private Long solvedDateTime;
    private Boolean isSolved;

    @Builder
    public MyProblemResponseDto(int myProblemId, int myBookId, int problemId, String mySolution,
                                Boolean isConfused, Boolean isRight, Long solvedDateTime, String myAnswer, Boolean isSolved){
        this.myProblemId = myProblemId;
        this.myBookId = myBookId;
        this.problemId = problemId;
        this.mySolution = mySolution;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
        this.isSolved = isSolved;
    }
}
