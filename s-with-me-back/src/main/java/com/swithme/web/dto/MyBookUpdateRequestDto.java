package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyBookUpdateRequestDto {

    private short lastProblemId;

    @Builder
    public MyBookUpdateRequestDto(short lastProblemId){
        this.lastProblemId = lastProblemId;
    }
}
