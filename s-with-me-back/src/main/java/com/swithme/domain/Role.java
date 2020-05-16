package com.swithme.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    ADMIN("ROLE_ADMIN"),
    STUDENT("ROLE_STUDENT"),
    PUBLISHER("ROLE_PUBLISHER");

    private String value;
}