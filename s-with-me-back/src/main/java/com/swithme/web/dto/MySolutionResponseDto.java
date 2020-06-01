package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MySolutionResponseDto {

    private ProblemInformationResponseDto problemInformationResponseDto;
    private String textSolution;
    private String imageSolution;
    private Integer linkSolutionId;
    private String solutionType;
    private String myAnswer;

    @Builder
    public MySolutionResponseDto(ProblemInformationResponseDto problemInformationResponseDto,
                                 String textSolution, String imageSolution, Integer linkSolutionId,
                                 String solutionType, String myAnswer){
        this.problemInformationResponseDto = problemInformationResponseDto;
        this.textSolution = textSolution;
        this.imageSolution = imageSolution;
        this.linkSolutionId = linkSolutionId;
        this.solutionType = solutionType;
        this.myAnswer = myAnswer;
    }
}
