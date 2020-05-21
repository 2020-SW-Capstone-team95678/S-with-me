package com.swithme.web.controller;

import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.service.UserService;
import com.swithme.signup.JwtTokenProvider;
import com.swithme.web.dto.StudentUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;
    private final UserService customUserDetailService;
    private short grade;
    // 회원가입
    @PostMapping("/signup/student")
    public int studentSignup(@RequestBody Map<String, String> user) {
        return studentRepository.save(Student.builder()
                .userId(user.get("userId"))
                .name(user.get("name"))
                .password(passwordEncoder.encode(user.get("password")))
                .phoneNumber(user.get("phoneNumber"))
                .birthday(user.get("birthday"))
                .grade(grade)
                .roles(Collections.singletonList("ROLE_STUDENT")) // 최초 가입시 USER 로 설정
                .build()).getStudentId();
    }

    // 로그인
    @PostMapping("/")
    public String login(@RequestBody Map<String, String> user) {
        Student student = studentRepository.findByUserId(user.get("userId"))
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
        if (!passwordEncoder.matches(user.get("password"), student.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(student.getUsername(), student.getRoles());
    }

    //프로필 업데이트
    @PutMapping("/student/profile")
    public int studentProfileUpdate(int studentId, @RequestBody StudentUpdateRequestDto studentUpdateRequestDto){
        return customUserDetailService.update(studentId,studentUpdateRequestDto);
    }

    @GetMapping("/student/profile")
    public Student dispProfile(int studentId){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
        return student;
    }
}