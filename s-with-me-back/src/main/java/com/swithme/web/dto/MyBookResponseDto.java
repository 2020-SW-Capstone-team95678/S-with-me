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
    private short lastProblemId;

    @Builder
    public MyBookResponseDto(int myBookId, int folderId, int bookId, short lastProblemId){
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastProblemId = lastProblemId;
    }
}
