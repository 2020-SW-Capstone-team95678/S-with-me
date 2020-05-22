package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteUpdateRequestDto {

    private long addedDateTime;
    private MyProblemUpdateRequestDto myProblemUpdateRequestDto;

    @Builder
    public NoteUpdateRequestDto(long addedDateTime, MyProblemUpdateRequestDto myProblemUpdateRequestDto){
        this.addedDateTime = addedDateTime;
        this.myProblemUpdateRequestDto = myProblemUpdateRequestDto;
    }
}
