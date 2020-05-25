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
    private short lastProblemNumber;

    @Builder
    public MyBookResponseDto(int myBookId, int folderId, int bookId, short lastProblemNumber){
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastProblemNumber = lastProblemNumber;
    }
}
