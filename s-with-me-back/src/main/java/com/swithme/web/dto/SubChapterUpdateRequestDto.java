package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubChapterUpdateRequestDto {

    private int mainChapterId;
    private String subChapterName;

    @Builder
    public SubChapterUpdateRequestDto(int mainChapterId, String subChapterName){
        this.mainChapterId = mainChapterId;
        this.subChapterName = subChapterName;
    }
}
