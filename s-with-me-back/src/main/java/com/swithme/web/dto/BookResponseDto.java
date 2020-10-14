package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookResponseDto {
    private int bookId;
    private String subject;
    private int price;
    private String publishedDate;
    private Boolean isOnSale;
    private String name;
    private short grade;
    private String cover;
    private String introduction;

    @Builder
    public BookResponseDto(int bookId, String subject, int price, String publishedDate, String name,
                           short grade, String cover, String introduction,Boolean isOnSale){
        this.bookId = bookId;
        this.subject = subject;
        this.price = price;
        this.publishedDate = publishedDate;
        this.name = name;
        this.isOnSale = isOnSale;
        this.grade = grade;
        this.cover = cover;
        this.introduction = introduction;
    }
}
