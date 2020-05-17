package com.swithme.domain.problem;

import com.swithme.domain.chapter.Chapter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "problem")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problemId")
    private int problemId;

    @ManyToOne
    @JoinColumn(name = "chapterId")
    private Chapter chapter;

    @Column(name = "content")
    private String content;

    @Column(name = "solution")
    private String solution;

    @Column(name = "pageNumber")
    private short pageNumber;

    @Column(name = "problemNumber")
    private short problemNumber;

    @Column(name = "answer")
    private String answer;

    @Column(name = "isOptional")
    private boolean isOptional;

    @Column(name = "option1")
    private String option1;

    @Column(name = "option2")
    private String option2;

    @Column(name = "option3")
    private String option3;

    @Column(name = "option4")
    private String option4;

    @Column(name = "option5")
    private String option5;

    @Builder
    public Problem(Chapter chapter, String content, String solution,
                   short pageNumber, short problemNumber, String answer, boolean isOptional,
                   String option1, String option2, String option3, String option4, String option5){
        this.chapter = chapter;
        this.content = content;
        this.solution = solution;
        this.pageNumber = pageNumber;
        this.problemNumber = problemNumber;
        this.answer = answer;
        this.isOptional = isOptional;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
    }
}
