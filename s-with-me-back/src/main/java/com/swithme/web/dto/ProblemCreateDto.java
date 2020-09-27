package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemCreateDto {
    private int subChapterId;
    private String content;
    private String solution;
    private String answer;
    private short problemNumber;
    private Boolean isOptional;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String option5;
    private String title;
    private String image;
    private Boolean isMath;

    @Builder
    public ProblemCreateDto(int subChapterId, String content, String solution, String answer, short problemNumber,
                            Boolean isOptional, String option1, String option2, String option3, String option4, String option5,
                            String title, String image, Boolean isMath) {
        this.subChapterId = subChapterId;
        this.content = content;
        this.solution = solution;
        this.answer = answer;
        this.problemNumber = problemNumber;
        this.isOptional = isOptional;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
        this.title = title;
        this.image = image;
        this.isMath = isMath;
    }
}