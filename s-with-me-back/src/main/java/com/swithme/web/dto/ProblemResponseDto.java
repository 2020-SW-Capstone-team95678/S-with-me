package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemResponseDto {

    private int problemId;
    private int chapterId;
    private String content;
    private String solution;
    private short pageNumber;
    private short problemNumber;
    private String answer;
    private Boolean isOptional;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String option5;

    @Builder
    public ProblemResponseDto(int problemId, int chapterId, String content, String solution,
                              short pageNumber, short problemNumber, String answer, Boolean isOptional,
                              String option1, String option2, String option3, String option4, String option5){
        this.problemId = problemId;
        this.chapterId = chapterId;
        this.content = content;
        this.solution = solution;
        this.pageNumber = pageNumber;
        this.problemNumber = problemNumber;
        this.answer = answer;
        this.isOptional = isOptional;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
    }

}
