package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyBookUpdateRequestDto {

    private int lastProblemId;

    @Builder
    public MyBookUpdateRequestDto(int lastProblemId){
        this.lastProblemId = lastProblemId;
    }
}
