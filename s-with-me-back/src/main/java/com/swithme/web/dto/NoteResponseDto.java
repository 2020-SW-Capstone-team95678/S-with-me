package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Clob;

@Getter
@NoArgsConstructor
public class NoteResponseDto {
    private int noteId;
    private int myProblemId;
    private int myBookId;
    private int problemId;
    private Integer linkSolutionId;
    private String imageSolution;
    private String textSolution;
    private String solutionType;
    private String myAnswer;
    private Boolean isConfused;
    private Boolean isRight;
    private Boolean isSolved;
    private Long solvedDateTime;

    @Builder
    public NoteResponseDto(int noteId, int myProblemId, int myBookId, int problemId, Integer linkSolutionId,
                           String imageSolution, String textSolution, String solutionType,
                           Boolean isConfused, Boolean isRight, Boolean isSolved, Long solvedDateTime, String myAnswer){
        this.noteId = noteId;
        this.myProblemId = myProblemId;
        this.myBookId = myBookId;
        this.problemId = problemId;
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
}
