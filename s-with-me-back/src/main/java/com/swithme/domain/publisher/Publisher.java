package com.swithme.domain.publisher;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "publisher")
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publisherId")
    private int publisherId;

    @Column(name = "id")
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Builder
    public Publisher(String id, String password, String name, String code){
        this.id = id;
        this.password = password;
        this.name = name;
        this.code = code;
    }
}
