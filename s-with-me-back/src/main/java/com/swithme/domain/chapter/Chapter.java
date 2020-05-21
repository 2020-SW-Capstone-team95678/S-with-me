package com.swithme.domain.chapter;

import com.swithme.domain.book.Book;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.*;
@Getter
@NoArgsConstructor
@Entity(name = "chapter")
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chapterId")
    private int chapterId;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;

    @Column(name = "isLevel1")
    private boolean isLevel1;

    @Column(name = "level1Name")
    private String level1Name;

    @Column(name = "isLevel2")
    private boolean isLevel2;

    @Column(name = "level2Name")
    private String level2Name;

    @Builder
    public Chapter(Book book, boolean isLevel1, String level1Name, boolean isLevel2, String level2Name){
        this.book = book;
        this.isLevel1 = isLevel1;
        this.level1Name = level1Name;
        this.isLevel2 = isLevel2;
        this.level2Name = level2Name;
    }

    public static void sort(List<Chapter> chapterList){
        Collections.sort(chapterList, new Comparator<Chapter>() {
            @Override
            public int compare(Chapter chapter, Chapter targetChapter) {
                return chapter.getLevel2Name().compareTo(targetChapter.getLevel2Name());
            }
        });

        Collections.sort(chapterList, new Comparator<Chapter>() {
            @Override
            public int compare(Chapter chapter, Chapter targetChapter) {
                return chapter.getLevel1Name().compareTo(targetChapter.getLevel1Name());
            }
        });

    }
}
