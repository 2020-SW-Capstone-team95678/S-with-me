package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteCreateDto {

    private int myProblemId;
    private Long addedDateTime;

    @Builder
    public NoteCreateDto(int myProblemId, Long addedDateTime){
        this.myProblemId = myProblemId;
        this.addedDateTime = addedDateTime;
    }
}
