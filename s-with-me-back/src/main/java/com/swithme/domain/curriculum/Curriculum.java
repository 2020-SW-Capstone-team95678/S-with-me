package com.swithme.domain.curriculum;

import com.swithme.domain.myBook.MyBook;
import com.swithme.web.dto.CurriculumUpdateRequestDto;
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

    @Column(name = "subChapterId")
    private int subChapterId;

    @Column(name = "monthlyGoal")
    private String monthlyGoal;

    @Column(name = "type")
    private String type;

    @Column(name = "dailyGoal")
    private int dailyGoal;

    @Builder
    public Curriculum(MyBook myBook, int subChapterId, String monthlyGoal, String type, int dailyGoal) {
        this.myBook = myBook;
        this.subChapterId = subChapterId;
        this.monthlyGoal = monthlyGoal;
        this.type = type;
        this.dailyGoal = dailyGoal;
    }

    public void update(CurriculumUpdateRequestDto curriculumUpdateRequestDto)
    {
        this.subChapterId = curriculumUpdateRequestDto.getSubChapterId();
        this.monthlyGoal = curriculumUpdateRequestDto.getMonthlyGoal();
        this.type = curriculumUpdateRequestDto.getType();
        this.dailyGoal = curriculumUpdateRequestDto.getDailyGoal();
    }
}
