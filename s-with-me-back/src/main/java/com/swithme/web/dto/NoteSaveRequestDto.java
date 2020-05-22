package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteSaveRequestDto {

    private int myProblemId;
    private long addedDateTime;

    @Builder
    public NoteSaveRequestDto(int myProblemId, long addedDateTime){
        this.myProblemId = myProblemId;
        this.addedDateTime = addedDateTime;
    }
}
