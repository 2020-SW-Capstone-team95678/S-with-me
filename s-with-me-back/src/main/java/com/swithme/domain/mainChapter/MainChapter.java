package com.swithme.domain.mainChapter;

import com.swithme.domain.book.Book;
import com.swithme.web.dto.MainChapterUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "mainChapter")
public class MainChapter implements Comparable<MainChapter>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mainChapterId")
    private int mainChapterId;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;

    @Column(name = "mainChapterName")
    private String mainChapterName;

    @Column(name = "beforeMainChapterId")
    private Integer beforeMainChapterId;

    @Builder
    public MainChapter(Book book, String mainChapterName, Integer beforeMainChapterId){
        this.book = book;
        this.mainChapterName = mainChapterName;
        this.beforeMainChapterId = beforeMainChapterId;
    }

    @Override
    public int compareTo(MainChapter mainChapter){
        if(mainChapter.getBeforeMainChapterId() == this.getMainChapterId())
            return 1;
        else if(this.getBeforeMainChapterId() == mainChapter.getMainChapterId())
            return -1;
        else
            return 0;
    }


public void update(MainChapterUpdateRequestDto requestDto) {
        this.mainChapterName = requestDto.getMainChapterName();
    }

    public void update(Integer beforeMainChapterId){
        this.beforeMainChapterId = beforeMainChapterId;
    }

}
