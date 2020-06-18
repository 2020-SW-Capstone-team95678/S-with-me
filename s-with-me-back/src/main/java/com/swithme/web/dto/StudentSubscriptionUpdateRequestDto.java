package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudentSubscriptionUpdateRequestDto {
    private Boolean isSubscribing;

    @Builder
    public StudentSubscriptionUpdateRequestDto(Boolean isSubscribing){
        this.isSubscribing = isSubscribing;
    }
}
