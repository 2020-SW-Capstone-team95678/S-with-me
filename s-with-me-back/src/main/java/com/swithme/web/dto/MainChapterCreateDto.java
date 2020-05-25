package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MainChapterCreateDto {

    private int bookId;
    private String mainChapterName;

    @Builder
    public MainChapterCreateDto(int bookId, String mainChapterName){
        this.bookId = bookId;
        this.mainChapterName = mainChapterName;
    }
}
