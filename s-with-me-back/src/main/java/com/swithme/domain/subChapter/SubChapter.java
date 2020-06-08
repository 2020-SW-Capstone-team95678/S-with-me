package com.swithme.domain.subChapter;

import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.note.Note;
import com.swithme.web.dto.SubChapterUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "subChapter")
public class SubChapter implements Comparable<SubChapter>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subChapterId")
    private int subChapterId;

    @ManyToOne
    @JoinColumn(name = "mainChapterId")
    private MainChapter mainChapter;

    @Column(name = "subChapterName")
    private String subChapterName;

    @Column(name = "beforeSubChapterId")
    private Integer beforeSubChapterId;

    @Builder
    public SubChapter(MainChapter mainChapter, String subChapterName, Integer beforeSubChapterId){
        this.mainChapter = mainChapter;
        this.subChapterName = subChapterName;
        this.beforeSubChapterId = beforeSubChapterId;
    }
    @Override
    public int compareTo(SubChapter subChapter){
        if(subChapter.getBeforeSubChapterId() == this.getSubChapterId())
            return -1;
        else if(this.getBeforeSubChapterId() == subChapter.getSubChapterId())
            return 1;
        else
            return 0;
    }

    public void update(MainChapter mainChapter, SubChapterUpdateRequestDto requestDto) {
        this.mainChapter = mainChapter;
        this.subChapterName = requestDto.getSubChapterName();
    }

    public void update(Integer beforeSubChapterId){
        this.beforeSubChapterId = beforeSubChapterId;
    }
}
