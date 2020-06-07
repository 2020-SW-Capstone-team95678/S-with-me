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
    private Integer linkSolutionId;
    private String imageSolution;
    private String textSolution;
    private String solutionType;
    private String myAnswer;
    private Boolean isConfused;
    private Boolean isRight;
    private Long solvedDateTime;
    private Boolean isSolved;
    private Boolean isMath;

    @Builder
    public MyProblemResponseDto(int myProblemId, int myBookId, int problemId, Integer linkSolutionId,
                                String imageSolution, String textSolution, String solutionType,
                                Boolean isConfused, Boolean isRight, Long solvedDateTime, String myAnswer, Boolean isSolved,
                                Boolean isMath){
        this.myProblemId = myProblemId;
        this.myBookId = myBookId;
        this.problemId = problemId;
        this.linkSolutionId = linkSolutionId;
        this.imageSolution = imageSolution;
        this.textSolution = textSolution;
        this.solutionType = solutionType;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
        this.isSolved = isSolved;
        this.isMath = isMath;
    }
}
