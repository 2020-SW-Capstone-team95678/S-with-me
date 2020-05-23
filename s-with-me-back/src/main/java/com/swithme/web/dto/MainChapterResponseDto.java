package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MainChapterResponseDto {

    private int mainChapterId;
    private String mainChapterName;

    @Builder
    public MainChapterResponseDto(int mainChapterId, String mainChapterName){
        this.mainChapterId = mainChapterId;
        this.mainChapterName = mainChapterName;
    }
}
