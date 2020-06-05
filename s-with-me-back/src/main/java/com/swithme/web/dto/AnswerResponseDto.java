package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class AnswerResponseDto {

    private int problemId ;
    private String answer;

    @Builder
    public AnswerResponseDto(int problemId, String answer){
        this.problemId = problemId;
        this.answer = answer;
    }
}
