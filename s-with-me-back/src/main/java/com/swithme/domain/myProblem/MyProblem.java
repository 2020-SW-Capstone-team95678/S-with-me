package com.swithme.domain.myProblem;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.problem.Problem;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import com.swithme.web.dto.NoteUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "myProblem")
public class MyProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myProblemId")
    private int myProblemId;

    @OneToOne
    @JoinColumn(name = "myBookId")
    private MyBook myBook;

    @OneToOne
    @JoinColumn(name = "problemId")
    private Problem problem;

    @Lob
    @Column(name = "mySolution")
    private String mySolution;

    @Column(name = "isConfused")
    private Boolean isConfused;

    @Column(name = "isRight")
    private Boolean isRight;

    @Column(name = "solvedDateTime")
    private Long solvedDateTime;

    @Column(name = "myAnswer")
    private String myAnswer;

    @Column(name = "isSolved")
    private Boolean isSolved;

    @Builder
    public MyProblem(MyBook myBook, Problem problem, String mySolution, Boolean isConfused, Boolean isRight,
                     Long solvedDateTime, String myAnswer, Boolean isSolved){
        this.myBook = myBook;
        this.problem = problem;
        this.mySolution = mySolution;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
        this.isSolved = isSolved;
    }

    public void update(MyProblemUpdateRequestDto requestDto) {
        this.mySolution = requestDto.getMySolution();
        this.isConfused = requestDto.getIsConfused();
        this.isRight = requestDto.getIsRight();
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.myAnswer = requestDto.getMyAnswer();
        this.isSolved = requestDto.getIsSolved();
    }

    public void update(NoteUpdateRequestDto requestDto){
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.isRight = requestDto.getIsRight();
        this.myAnswer = requestDto.getMyAnswer();
        this.mySolution = requestDto.getMySolution();
    }

//    public void update(MyProblem entity) {
//        this.mySolution = entity.getMySolution();
//        this.isConfused = entity.isConfused();
//        this.isRight = entity.isRight();
//        this.solvedDateTime = entity.getSolvedDateTime();
//        this.myAnswer = entity.getMyAnswer();
//    }
}
