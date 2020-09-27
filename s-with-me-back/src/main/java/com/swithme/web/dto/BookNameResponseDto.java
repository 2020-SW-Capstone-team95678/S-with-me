package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookNameResponseDto {

    private int bookId;
    private String bookName;

    @Builder
    public BookNameResponseDto(int bookId, String bookName){
        this.bookId = bookId;
        this.bookName = bookName;
    }
}
