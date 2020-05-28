package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyBookUpdateRequestDto {

    private int lastSubChapterId;
    private short lastPageNumber;

    @Builder
    public MyBookUpdateRequestDto(int lastSubChapterId, short lastPageNumber){
        this.lastSubChapterId = lastSubChapterId;
        this.lastPageNumber = lastPageNumber;
    }
}
