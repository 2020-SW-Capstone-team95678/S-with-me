package com.swithme.web.dto;

import com.swithme.domain.publisher.Publisher;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
public class BookInformationResponseDto {

    private int bookId;
    private int publisherId;
    private String subject;
    private int price;
    private String publishedDate;
    private String name;
    private short grade;
    private String cover;
    private Boolean isAdvertised;
    private short totalProblemNumber;
    private int monthlyProfit;
    private int monthlySold;

    @Builder
    public BookInformationResponseDto(int bookId, int publisherId, String subject, int price, String publishedDate,
                                      String name, short grade, String cover, Boolean isAdvertised,
                                      short totalProblemNumber, int monthlyProfit, int monthlySold){
        this.bookId = bookId;
        this.publisherId = publisherId;
        this.subject = subject;
        this.price = price;
        this.publishedDate = publishedDate;
        this.name = name;
        this.grade = grade;
        this.cover = cover;
        this.isAdvertised = isAdvertised;
        this.totalProblemNumber = totalProblemNumber;
        this.monthlyProfit = monthlyProfit;
        this.monthlySold = monthlySold;
    }
}
