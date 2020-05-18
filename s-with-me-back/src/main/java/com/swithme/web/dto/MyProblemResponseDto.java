package com.swithme.web.dto;

import com.swithme.domain.problem.Problem;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MyProblemResponseDto {

    private int myProblemId;
    private int myBookId;
    private Problem problem;
    private String mySolution;
    private String myAnswer;
    private boolean isConfused;
    private boolean isRight;
    private Long solvedDateTime;

    @Builder
    public MyProblemResponseDto(int myProblemId, int myBookId, Problem problem, String mySolution,
                                boolean isConfused, boolean isRight, Long solvedDateTime, String myAnswer){
        this.myProblemId = myProblemId;
        this.myBookId = myBookId;
        this.problem = problem;
        this.mySolution = mySolution;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
    }
}
