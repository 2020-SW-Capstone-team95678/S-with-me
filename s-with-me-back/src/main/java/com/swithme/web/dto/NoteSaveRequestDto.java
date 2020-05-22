package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteSaveRequestDto {

    private int studentId;
    private int myProblemId;
    private long addedDateTime;

    @Builder
    public NoteSaveRequestDto(int studentId, int myProblemId, long addedDateTime){
        this.studentId = studentId;
        this.myProblemId = myProblemId;
        this.addedDateTime = addedDateTime;
    }
}
