package com.swithme.web.dto;

import com.swithme.domain.publisher.Publisher;
import lombok.Getter;

@Getter
public class PublisherResponseDto {

    int publisherId;
    String id;
    String name;
    String code;

    public PublisherResponseDto(Publisher entity){
        this.publisherId = entity.getPublisherId();
        this.id = entity.getUserId();
        this.name = entity.getName();
        this.code = entity.getCode();
    }
}
