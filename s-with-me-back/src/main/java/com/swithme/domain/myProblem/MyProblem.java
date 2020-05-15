package com.swithme.domain.myProblem;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.problem.Problem;
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

    @Column(name = "solvedDate")
    private String solvedDate;

    @Column(name = "myAnswer")
    private String myAnswer;

    @Builder
    public MyProblem(MyBook myBook, Problem problem, String mySolution, boolean isConfused, boolean isRight,
                     String solvedDate, String myAnswer){
        this.myBook = myBook;
        this.problem = problem;
        this.mySolution = mySolution;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDate = solvedDate;
        this.myAnswer = myAnswer;
    }

}
