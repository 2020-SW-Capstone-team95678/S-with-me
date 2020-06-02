package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class MyProblemUpdateRequestDto {
    private Boolean isConfused;
    private Boolean isRight;
    private Integer linkSolutionId;
    private String imageSolution;
    private String textSolution;
    private String solutionType;
    private String myAnswer;
    private Long solvedDateTime;
    private Boolean isSolved;

    @Builder
    public MyProblemUpdateRequestDto(Boolean isConfused, Boolean isRight, Integer linkSolutionId, String imageSolution,
                                     String textSolution, String solutionType,
                                     String myAnswer, Long solvedDateTime, Boolean isSolved){
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.linkSolutionId = linkSolutionId;
        this.imageSolution = imageSolution;
        this.textSolution = textSolution;
        this.solutionType = solutionType;
        this.myAnswer = myAnswer;
        this.solvedDateTime = solvedDateTime;
        this.isSolved = isSolved;
    }
}
