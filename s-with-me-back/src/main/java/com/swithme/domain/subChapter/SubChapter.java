package com.swithme.domain.subChapter;

import com.swithme.domain.mainChapter.MainChapter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "subChapter")
public class SubChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subChapterId")
    private int subChapterId;

    @ManyToOne
    @JoinColumn(name = "mainChapterId")
    private MainChapter mainChapter;

    @Column(name = "subChapterName")
    private String subChapterName;

    @Builder
    public SubChapter(MainChapter mainChapter, String subChapterName){
        this.mainChapter = mainChapter;
        this.subChapterName = subChapterName;
    }

}
