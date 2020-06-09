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
    private String receiptId;

    @Builder
    public MyBookResponseDto(int myBookId, int folderId, int bookId, int lastSubChapterId, short lastPageNumber,String receiptId){
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastSubChapterId = lastSubChapterId;
        this.lastPageNumber = lastPageNumber;
        this.receiptId =  receiptId;
    }
}
