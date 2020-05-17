package com.swithme.web.dto;

import com.swithme.domain.chapter.Chapter;
import lombok.Getter;

import java.util.*;
@Getter
public class ChapterListResponseDto {

    private List<Chapter> chapterList;

    public ChapterListResponseDto(List<Chapter> chapterList){
        this.chapterList = chapterList;
    }
}
