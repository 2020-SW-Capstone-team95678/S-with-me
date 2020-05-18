package com.swithme.web.dto;

import com.swithme.domain.myProblem.MyProblem;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;
@Getter
@NoArgsConstructor
public class MyProblemUpdateRequestDto {
    private boolean isConfused;
    private boolean isRight;
    private String mySolution;
    private String myAnswer;
    private Long solvedDateTime;

    @Builder
    public MyProblemUpdateRequestDto(boolean isConfused, boolean isRight, String mySolution,
                                     String myAnswer, Long solvedDateTime){
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.mySolution = mySolution;
        this.myAnswer = myAnswer;
        this.solvedDateTime = solvedDateTime;
    }

//    private List<MyProblem> myProblemList;
//
//    public MyProblemUpdateRequestDto(List<MyProblem> myProblemList){
//        this.myProblemList = myProblemList;
//    }
}
