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

    private MainChapterResponseDto mainChapterResponseDto;
    private List<SubChapterResponseDto> subChapterResponseDtoList;

    @Builder
    public ChapterResponseDto(MainChapterResponseDto mainChapterResponseDto, List<SubChapterResponseDto> subChapterResponseDtoList){
        this.mainChapterResponseDto = mainChapterResponseDto;
        this.subChapterResponseDtoList = subChapterResponseDtoList;
    }

}
