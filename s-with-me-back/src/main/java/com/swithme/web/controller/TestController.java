package com.swithme.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/testPublish")
    public String testPublish(){
        return "배포 성공!!!";
    }
}
