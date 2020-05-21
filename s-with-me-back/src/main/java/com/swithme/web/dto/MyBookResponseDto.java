package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyBookResponseDto {

    private int myBookId;
    private int folderId;
    private int bookId;
    private short lastPageNumber;

    @Builder
    public MyBookResponseDto(int myBookId, int folderId, int bookId, short lastPageNumber){
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastPageNumber = lastPageNumber;
    }
}
