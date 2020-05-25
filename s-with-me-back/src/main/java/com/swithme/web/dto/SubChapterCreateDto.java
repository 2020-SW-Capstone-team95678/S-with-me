package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubChapterCreateDto {

    private int mainChapterId;
    private String subChapterName;

    @Builder
    public SubChapterCreateDto(int mainChapterId, String subChapterName){
        this.mainChapterId = mainChapterId;
        this.subChapterName = subChapterName;
    }
}
