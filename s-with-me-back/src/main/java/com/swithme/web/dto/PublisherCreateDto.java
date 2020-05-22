package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
public class PublisherCreateDto {
    int publisherId;
    String id;
    String password;
    String name;
    String code;

    @Builder
    public PublisherCreateDto(int publisherId,String id, String password, String name, String code) {
        this.publisherId = publisherId;
        this.id = id;
        this.password = password;
        this.name = name;
        this.code = code;
    }
}