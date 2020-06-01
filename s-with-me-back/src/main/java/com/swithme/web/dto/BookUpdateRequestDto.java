package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookUpdateRequestDto {

    private String subject;
    private int price;
    private String publishedDate;
    private String name;
    private short grade;
    private String cover;
    private String introduction;

    @Builder
    public BookUpdateRequestDto(String subject, int price, String publishedDate,
                                String name, short grade, String cover, String introduction){
        this.subject = subject;
        this.price = price;
        this.publishedDate = publishedDate;
        this.name = name;
        this.grade = grade;
        this.cover = cover;
        this.introduction = introduction;
    }
}
