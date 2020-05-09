package com.swithme.domain.swithme;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    private int pubId;
    private String subject;
    private short price;
    private String pubDate;
    private String bookName;
    private short grade;
    private String cover;
    private Boolean isAd;

    @Builder
    public Book(int pubId, String subject, short price, String pubDate, String bookName, short grade, String cover, Boolean isAd){
        this.pubId = pubId;
        this.subject = subject;
        this.price = price;
        this.pubDate = pubDate;
        this.bookName = bookName;
        this.grade = grade;
        this.cover = cover;
        this.isAd = isAd;
    }

}
