package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyBookResponseDto {

    private int myBookId;
    private int folderId;
    private int bookId;
    private int lastSubChapterId;
    private short lastPageNumber;

    @Builder
    public MyBookResponseDto(int myBookId, int folderId, int bookId, int lastSubChapterId, short lastPageNumber){
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastSubChapterId = lastSubChapterId;
        this.lastPageNumber = lastPageNumber;
    }
}
