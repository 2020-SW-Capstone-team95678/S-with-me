package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProblemIdResponseDto {
    private int problemId;

    @Builder
    public ProblemIdResponseDto(int problemId){
        this.problemId = problemId;
    }
}
