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
    private short price;

    @Column(name = "publishedDate")
    private String publishedDate;

    @Column(name = "name")
    private String name;

    @Column(name = "grade")
    private short grade;

    @Column(name = "cover")
    private String cover;

    @Column(name = "isAdvertised")
    private boolean isAdvertised;

    @Builder
    public Book(Publisher publisher, String subject, short price, String publishedDate,
                String name, short grade, String cover, boolean isAdvertised){
        this.publisher = publisher;
        this.subject = subject;
        this.price = price;
        this.publishedDate = publishedDate;
        this.name = name;
        this.grade = grade;
        this.cover = cover;
        this.isAdvertised = isAdvertised;
    }
}
