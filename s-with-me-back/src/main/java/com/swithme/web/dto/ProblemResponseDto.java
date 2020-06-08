package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemResponseDto {

    private int problemId;
    private int subChapterId;
    private String content;
    private String solution;
    private short problemNumber;
    private String answer;
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
    public ProblemResponseDto(int problemId, int subChapterId, String content, String solution, String title, String image,
                               short problemNumber, String answer, Boolean isOptional, Boolean isMath,
                              String option1, String option2, String option3, String option4, String option5){
        this.problemId = problemId;
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
        this.isMath = isMath;
    }

}
