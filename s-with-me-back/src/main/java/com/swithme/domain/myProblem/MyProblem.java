package com.swithme.domain.myProblem;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.problem.Problem;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
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

    @Column(name = "mySolution")
    private String mySolution;

    @Column(name = "isConfused")
    private boolean isConfused;

    @Column(name = "isRight")
    private boolean isRight;

    @Column(name = "solvedDateTime")
    private Long solvedDateTime;

    @Column(name = "myAnswer")
    private String myAnswer;

    @Column(name = "isSolved")
    private boolean isSolved;

    @Builder
    public MyProblem(MyBook myBook, Problem problem, String mySolution, boolean isConfused, boolean isRight,
                     Long solvedDateTime, String myAnswer, boolean isSolved){
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
        this.isConfused = requestDto.isConfused();
        this.isRight = requestDto.isRight();
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.myAnswer = requestDto.getMyAnswer();
        this.isSolved = requestDto.isSolved();
    }

//    public void update(MyProblem entity) {
//        this.mySolution = entity.getMySolution();
//        this.isConfused = entity.isConfused();
//        this.isRight = entity.isRight();
//        this.solvedDateTime = entity.getSolvedDateTime();
//        this.myAnswer = entity.getMyAnswer();
//    }
}
