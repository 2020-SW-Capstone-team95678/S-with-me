package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemUpdateRequestDto {

    private int subChapterId;
    private String title;
    private String content;
    private String solution;
    private String image;
    private short problemNumber;
    private String answer;
    private Boolean isOptional;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String option5;

    @Builder
    public ProblemUpdateRequestDto(int subChapterId, String title, String content, String solution,
                                   String image, short problemNumber, String answer,
                                   Boolean isOptional, String option1, String option2, String option3, String option4, String option5){
        this.subChapterId = subChapterId;
        this.title = title;
        this.content = content;
        this.solution = solution;
        this.image = image;
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
