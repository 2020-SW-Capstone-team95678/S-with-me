package com.swithme.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/testPublish")
    public String testPublish(){
        return "배포 성공!!!";
    }
}
