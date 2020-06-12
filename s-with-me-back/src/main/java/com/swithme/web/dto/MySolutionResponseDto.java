package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Clob;

@Getter
@NoArgsConstructor
public class MySolutionResponseDto {

    private ProblemResponseDto problem;
    private Integer linkSolutionId;
    private String textSolution;
    private String imageSolution;
    private String handSolution;
    private String solutionType;
    private String myAnswer;

    @Builder
    public MySolutionResponseDto(ProblemResponseDto problem, Integer linkSolutionId,
                                 String textSolution, String imageSolution, String handSolution,
                                 String solutionType, String myAnswer){
        this.problem = problem;
        this.linkSolutionId = linkSolutionId;
        this.textSolution = textSolution;
        this.imageSolution = imageSolution;
        this.handSolution = handSolution;
        this.solutionType = solutionType;
        this.myAnswer = myAnswer;
    }
}
