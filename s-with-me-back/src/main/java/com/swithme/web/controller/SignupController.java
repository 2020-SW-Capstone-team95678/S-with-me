package com.swithme.web.controller;

import com.swithme.service.StudentService;
import com.swithme.web.dto.StudentDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@AllArgsConstructor
public class SignupController {
    private StudentService studentService;

    // 메인 페이지
    @GetMapping("/")
    public String index() { return "/index";    }

    // 회원가입 페이지
    @GetMapping("/student/signup")
    public String studentSignup() {
        return "/studentSignup";
    }

    // 회원가입 처리
    @PostMapping("/student/signup")
    public String execStudentSignup(StudentDto studentDto) {
        studentService.joinUser(studentDto);
        return "redirect:/";
    }

    // 로그인 결과 페이지
    @GetMapping("/user/login/result")
    public String dispLoginResult() {
        return "/loginSuccess";
    }

    // 로그아웃 결과 페이지
    @GetMapping("/user/logout/result")
    public String dispLogout() {
        return "/logout";
    }

    // 접근 거부 페이지
    @GetMapping("/user/denied")
    public String dispDenied() {
        return "/denied";
    }

    // 내 정보 페이지
    @GetMapping("/user/info")
    public String dispMyInfo() {
        return "/myinfo";
    }

    // 어드민 페이지
    @GetMapping("/admin")
    public String dispAdmin() {
        return "/admin";
    }
}