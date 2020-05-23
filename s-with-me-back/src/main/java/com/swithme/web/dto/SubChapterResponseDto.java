package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubChapterResponseDto {

    private int subChapterId;
    private int mainChapterId;
    private String subChapterName;

    @Builder
    public SubChapterResponseDto(int subChapterId, int mainChapterId, String subChapterName){
        this.subChapterId = subChapterId;
        this.mainChapterId = mainChapterId;
        this.subChapterName = subChapterName;
    }
}
