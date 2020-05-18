package com.swithme.web.dto;

import com.swithme.domain.myProblem.MyProblem;
import lombok.Getter;

import java.util.*;
@Getter
public class MyProblemResponseDto {

    private List<MyProblem> myProblemList;

    public MyProblemResponseDto(List<MyProblem> myProblemList){
        this.myProblemList = myProblemList;
    }
}
