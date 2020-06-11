package com.swithme.domain.book;

import com.swithme.domain.publisher.Publisher;
import com.swithme.web.dto.BookUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.scheduling.annotation.Scheduled;

import javax.persistence.*;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;

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
    private Integer price;

    @Column(name = "publishedDate")
    private String publishedDate;

    @Column(name = "name")
    private String name;

    @Column(name = "grade")
    private Short grade;

    @Lob
    @Column(name = "cover")
    private Clob cover;

    @Column(name = "isAdvertised")
    private Boolean isAdvertised;

    @Column(name = "isOnSale")
    private Boolean isOnSale;

    @Column(name = "monthlyProfit")
    private Integer monthlyProfit;

    @Column(name = "monthlySold")
    private Integer monthlySold;

    @Lob
    @Column(name = "introduction")
    private Clob introduction;

    @Builder
    public Book(Publisher publisher, String subject, Integer price, String publishedDate,
                String name, Short grade, Clob cover, Boolean isAdvertised, Boolean isOnSale,
                Integer monthlyProfit, Integer monthlySold, Clob introduction){
        this.publisher = publisher;
        this.subject = subject;
        this.price = price;
        this.publishedDate = publishedDate;
        this.name = name;
        this.grade = grade;
        this.cover = cover;
        this.isAdvertised = isAdvertised;
        this.isOnSale = isOnSale;
        this.monthlyProfit = monthlyProfit;
        this.monthlySold = monthlySold;
        this.introduction = introduction;
    }

    public void sold(){
        this.monthlyProfit += this.price;
        this.monthlySold += 1;
    }

    public void update(BookUpdateRequestDto requestDto) {
        this.subject = requestDto.getSubject();
        this.price = requestDto.getPrice();
        this.publishedDate = requestDto.getPublishedDate();
        this.name = requestDto.getName();
        this.grade = requestDto.getGrade();
        this.isOnSale = requestDto.getIsOnSale();

        try{ this.cover = ClobProxy.generateProxy(requestDto.getCover()); }
        catch (NullPointerException nullPointerException){ this.cover = null; }

        try{ this.introduction = ClobProxy.generateProxy(requestDto.getIntroduction()); }
        catch (NullPointerException nullPointerException){ this.introduction = null; }
    }

    public static String readClobData(Reader reader) throws IOException {
        StringBuffer stringBuffer = new StringBuffer();
        char[] buffer = new char[1024];
        if(reader != null){
            int length = 0;
            while((length = reader.read(buffer)) != -1)
                stringBuffer.append(buffer, 0, length);
        }
        return stringBuffer.toString();
    }

    public void cleanUpMonthlyProfitAndSold() {
        this.monthlyProfit = 0;
        this.monthlySold = 0;
        System.out.println(this.monthlyProfit);
        System.out.println(this.monthlySold);
    }
}
