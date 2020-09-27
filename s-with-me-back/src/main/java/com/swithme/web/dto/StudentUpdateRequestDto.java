package com.swithme.web.dto;

import lombok.*;

@Getter
@NoArgsConstructor
public class StudentUpdateRequestDto {
    private String userId;
    /*private String name;
    private String phoneNumber;
    private String birthday;
    private Short grade;*/

    @Builder
    public StudentUpdateRequestDto( String userId) {
        this.userId = userId;
        /*this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;*/
    }
}
