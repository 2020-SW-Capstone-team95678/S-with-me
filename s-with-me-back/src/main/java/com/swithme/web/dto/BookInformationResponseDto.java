package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BookInformationResponseDto {

    private int bookId;
    private int publisherId;
    private String subject;
    private Boolean isOnSale;
    private int price;
    private String publishedDate;
    private String name;
    private short grade;
    private String cover;
    private Boolean isAdvertised;
    private int monthlyProfit;
    private int monthlySold;
    private String introduction;

    @Builder
    public BookInformationResponseDto(int bookId, int publisherId, String subject, int price, String publishedDate,
                                      String name, short grade, String cover, Boolean isAdvertised,Boolean isOnSale,
                                      int monthlyProfit, int monthlySold, String introduction){
        this.bookId = bookId;
        this.publisherId = publisherId;
        this.subject = subject;
        this.price = price;
        this.isOnSale = isOnSale;
        this.publishedDate = publishedDate;
        this.name = name;
        this.grade = grade;
        this.cover = cover;
        this.isAdvertised = isAdvertised;
        this.monthlyProfit = monthlyProfit;
        this.monthlySold = monthlySold;
        this.introduction = introduction;
    }
}
