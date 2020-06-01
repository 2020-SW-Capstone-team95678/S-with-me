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

    @Column(name = "linkSolutionId")
    private Integer linkSolutionId;

    @Lob
    @Column(name = "imageSolution")
    private Byte[] imageSolution;

    @Column(name = "textSolution")
    private String textSolution;

    @Column(name = "solutionType")
    private String solutionType;

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
    public MyProblem(MyBook myBook, Problem problem, Integer linkSolutionId,
                     Byte[] imageSolution, String textSolution, String solutionType,
                     Boolean isConfused, Boolean isRight, Long solvedDateTime, String myAnswer, Boolean isSolved) {
        this.myBook = myBook;
        this.problem = problem;
        this.linkSolutionId = linkSolutionId;
        this.imageSolution = imageSolution;
        this.textSolution = textSolution;
        this.solutionType = solutionType;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
        this.isSolved = isSolved;
    }

    public void update(MyProblemUpdateRequestDto requestDto) {
        this.linkSolutionId = requestDto.getLinkSolutionId();
        this.imageSolution = requestDto.getImageSolution();
        this.textSolution = requestDto.getTextSolution();
        this.solutionType = requestDto.getSolutionType();
        this.isConfused = requestDto.getIsConfused();
        this.isRight = requestDto.getIsRight();
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.myAnswer = requestDto.getMyAnswer();
        this.isSolved = requestDto.getIsSolved();
    }

    public void update(NoteUpdateRequestDto requestDto) {
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.isRight = requestDto.getIsRight();
        this.myAnswer = requestDto.getMyAnswer();
        this.linkSolutionId = requestDto.getLinkSolutionId();
        this.imageSolution = requestDto.getImageSolution();
        this.textSolution = requestDto.getTextSolution();
        this.solutionType = requestDto.getSolutionType();
    }
}
