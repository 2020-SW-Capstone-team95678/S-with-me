package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyBookUpdateRequestDto {

    private short lastProblemNumber;

    @Builder
    public MyBookUpdateRequestDto(short lastProblemNumber){
        this.lastProblemNumber = lastProblemNumber;
    }
}
