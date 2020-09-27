package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudentSubscriptionUpdateRequestDto {
    private Boolean isSubscribing;
    private String payDateTime;

    @Builder
    public StudentSubscriptionUpdateRequestDto(Boolean isSubscribing, String payDateTime){
        this.isSubscribing = isSubscribing;
        this.payDateTime = payDateTime;
    }
}
