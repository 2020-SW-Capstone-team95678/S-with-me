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
public class MainChapter {

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

    public void update(MainChapterUpdateRequestDto requestDto) {
        this.mainChapterName = requestDto.getMainChapterName();
    }

    public void update(Integer beforeMainChapterId){
        this.beforeMainChapterId = beforeMainChapterId;
    }

}
