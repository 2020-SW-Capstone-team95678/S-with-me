package com.swithme.domain.curriculum;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.subChapter.SubChapter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "curriculum")
public class Curriculum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "curriculumId")
    private int curriculumId;

    @OneToOne
    @JoinColumn(name = "myBookId")
    private MyBook myBook;

    @ManyToOne
    @JoinColumn(name = "subChapterId")
    private SubChapter subChapter;

    @Column(name = "monthlyGoal")
    private String monthlyGoal;

    @Column(name = "type")
    private String type;

    @Column(name = "dailyGoal")
    private int dailyGoal;

    @Builder
    public Curriculum(MyBook myBook,SubChapter subChapter,String monthlyGoal, String type, int dailyGoal) {
        this.myBook = myBook;
        this.subChapter = subChapter;
        this.monthlyGoal = monthlyGoal;
        this.type = type;
        this.dailyGoal = dailyGoal;
    }
}
