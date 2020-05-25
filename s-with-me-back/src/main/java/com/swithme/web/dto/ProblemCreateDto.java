package com.swithme.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemCreateDto {
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
}
