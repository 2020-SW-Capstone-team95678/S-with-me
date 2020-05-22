package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoteUpdateRequestDto {

    private Long addedDateTime;
    private MyProblemUpdateRequestDto myProblemUpdateRequestDto;

    @Builder
    public NoteUpdateRequestDto(Long addedDateTime, MyProblemUpdateRequestDto myProblemUpdateRequestDto){
        this.addedDateTime = addedDateTime;
        this.myProblemUpdateRequestDto = myProblemUpdateRequestDto;
    }
}
