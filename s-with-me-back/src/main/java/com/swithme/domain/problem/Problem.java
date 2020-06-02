package com.swithme.domain.problem;

import com.swithme.domain.subChapter.SubChapter;
import com.swithme.web.dto.ProblemUpdateRequestDto;
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
    @JoinColumn(name = "subChapterId")
    private SubChapter subChapter;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "solution")
    private String solution;

    @Column(name = "problemNumber")
    private short problemNumber;

    @Column(name = "answer")
    private String answer;

    @Lob
    @Column(name = "image")
    private String image;

    @Column(name = "isOptional")
    private Boolean isOptional;

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
    public Problem(SubChapter subChapter, String title, String content, String solution,
                    short problemNumber, String image, String answer, Boolean isOptional,
                   String option1, String option2, String option3, String option4, String option5){
        this.subChapter = subChapter;
        this.title = title;
        this.content = content;
        this.solution = solution;
        this.problemNumber = problemNumber;
        this.image = image;
        this.answer = answer;
        this.isOptional = isOptional;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
    }

    public void update(SubChapter subChapter, ProblemUpdateRequestDto requestDto) {
        this.subChapter = subChapter;
        this.content = requestDto.getContent();
        this.solution = requestDto.getSolution();
        this.problemNumber = requestDto.getProblemNumber();
        this.answer = requestDto.getAnswer();
        this.isOptional = requestDto.getIsOptional();
        this.option1 = requestDto.getOption1();
        this.option2 = requestDto.getOption2();
        this.option3 = requestDto.getOption3();
        this.option4 = requestDto.getOption4();
        this.option5 = requestDto.getOption5();
    }
}
