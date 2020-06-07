package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteUpdateRequestDto {

    private Long solvedDateTime;
    private Boolean isRight;
    private String myAnswer;
    private Integer linkSolutionId;
    private String imageSolution;
    private String textSolution;
    private String solutionType;

    @Builder
    public NoteUpdateRequestDto(Long solvedDateTime, Boolean isRight, String myAnswer, Integer linkSolutionId,
                                String imageSolution, String textSolution, String solutionType){
        this.solvedDateTime = solvedDateTime;
        this.isRight = isRight;
        this.myAnswer = myAnswer;
        this.linkSolutionId = linkSolutionId;
        this.imageSolution = imageSolution;
        this.textSolution = textSolution;
        this.solutionType = solutionType;
    }
}
