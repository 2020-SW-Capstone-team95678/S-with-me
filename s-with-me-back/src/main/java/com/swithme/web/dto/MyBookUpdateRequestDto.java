package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyBookUpdateRequestDto {

    private short lastPageNumber;

    @Builder
    public MyBookUpdateRequestDto(short lastPageNumber){
        this.lastPageNumber = lastPageNumber;
    }
}
