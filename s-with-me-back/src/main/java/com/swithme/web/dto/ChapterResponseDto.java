package com.swithme.web.dto;

import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.subChapter.SubChapter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;
@Getter
@NoArgsConstructor
public class ChapterResponseDto {

    private MainChapter mainChapter;
    private List<SubChapter> subChapterList;

    @Builder
    public ChapterResponseDto(MainChapter mainChapter, List<SubChapter> subChapterList){
        this.mainChapter = mainChapter;
        this.subChapterList = subChapterList;
    }

}
