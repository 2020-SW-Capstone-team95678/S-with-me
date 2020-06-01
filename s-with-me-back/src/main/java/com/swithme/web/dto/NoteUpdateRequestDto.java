package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Clob;

@Getter
@NoArgsConstructor
public class NoteUpdateRequestDto {

    private Long solvedDateTime;
    private Boolean isRight;
    private String myAnswer;
    private String mySolution;

    @Builder
    public NoteUpdateRequestDto(Long solvedDateTime, Boolean isRight, String myAnswer, String mySolution){
        this.solvedDateTime = solvedDateTime;
        this.isRight = isRight;
        this.myAnswer = myAnswer;
        this.mySolution = mySolution;
    }
}
