package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MainChapterUpdateRequestDto {

    private String mainChapterName;

    @Builder
    public MainChapterUpdateRequestDto(String mainChapterName){
        this.mainChapterName = mainChapterName;
    }
}
