package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MonthlyProfitAndSoldResponseDto {
    private Long monthlyProfit;
    private Integer monthlySold;

    @Builder
    public MonthlyProfitAndSoldResponseDto(Long monthlyProfit, Integer monthlySold){
        this.monthlyProfit = monthlyProfit;
        this.monthlySold = monthlySold;
    }
}
