package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookIdResponseDto {

    private int bookId;

    @Builder
    public BookIdResponseDto(int bookId){
        this.bookId = bookId;
    }
}
