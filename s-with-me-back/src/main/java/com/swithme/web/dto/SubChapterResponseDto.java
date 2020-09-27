package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubChapterResponseDto {

    private int mainChapterId;
    private int subChapterId;
    private String subChapterName;

    @Builder
    public SubChapterResponseDto(int mainChapterId, int subChapterId, String subChapterName){
        this.mainChapterId = mainChapterId;
        this.subChapterId = subChapterId;
        this.subChapterName = subChapterName;
    }
}
