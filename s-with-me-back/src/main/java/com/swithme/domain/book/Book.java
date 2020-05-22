package com.swithme.domain.book;

import com.swithme.domain.publisher.Publisher;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookId")
    private int bookId;

    @ManyToOne
    @JoinColumn(name = "publisherId")
    private Publisher publisher;

    @Column(name = "subject")
    private String subject;

    @Column(name = "price")
    private int price;

    @Column(name = "publishedDate")
    private String publishedDate;

    @Column(name = "name")
    private String name;

    @Column(name = "grade")
    private short grade;

    @Column(name = "cover")
    private String cover;

    @Column(name = "isAdvertised")
    private Boolean isAdvertised;

    @Column(name = "totalProblemNumber")
    private short totalProblemNumber;

    @Column(name = "monthlyProfit")
    private int monthlyProfit;

    @Column(name = "monthlySold")
    private int monthlySold;

    @Builder
    public Book(Publisher publisher, String subject, int price, String publishedDate,
                String name, short grade, String cover, Boolean isAdvertised,
                short totalProblemNumber, int monthlyProfit, int monthlySold){
        this.publisher = publisher;
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
