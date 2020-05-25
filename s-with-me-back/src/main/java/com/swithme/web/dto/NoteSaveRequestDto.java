package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteSaveRequestDto {

    private int myProblemId;
    private Long addedDateTime;

    @Builder
    public NoteSaveRequestDto(int myProblemId, Long addedDateTime){
        this.myProblemId = myProblemId;
        this.addedDateTime = addedDateTime;
    }
}
