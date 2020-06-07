package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Clob;

@Getter
@NoArgsConstructor
public class MySolutionResponseDto {

    private ProblemResponseDto problem;
    private Clob textSolution;
    private Clob imageSolution;
    private Integer linkSolutionId;
    private String solutionType;
    private String myAnswer;

    @Builder
    public MySolutionResponseDto(ProblemResponseDto problem,
                                 Clob textSolution, Clob imageSolution, Integer linkSolutionId,
                                 String solutionType, String myAnswer){
        this.problem = problem;
        this.textSolution = textSolution;
        this.imageSolution = imageSolution;
        this.linkSolutionId = linkSolutionId;
        this.solutionType = solutionType;
        this.myAnswer = myAnswer;
    }
}
