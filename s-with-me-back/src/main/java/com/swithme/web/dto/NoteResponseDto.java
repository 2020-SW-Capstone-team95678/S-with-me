package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteResponseDto {
    private int noteId;
    private int myProblemId;
    private int myBookId;
    private int problemId;
    private String mySolution;
    private String myAnswer;
    private Boolean isConfused;
    private Boolean isRight;
    private Boolean isSolved;
    private Long solvedDateTime;

    @Builder
    public NoteResponseDto(int noteId, int myProblemId, int myBookId, int problemId, String mySolution,
                                Boolean isConfused, Boolean isRight, Boolean isSolved, Long solvedDateTime, String myAnswer){
        this.noteId = noteId;
        this.myProblemId = myProblemId;
        this.myBookId = myBookId;
        this.problemId = problemId;
        this.mySolution = mySolution;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
        this.isSolved = isSolved;
    }
}
