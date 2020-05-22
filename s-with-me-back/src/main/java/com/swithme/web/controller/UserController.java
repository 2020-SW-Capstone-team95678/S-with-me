package com.swithme.web.controller;

import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.service.UserService;
import com.swithme.signup.JwtTokenProvider;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;
    private final PublisherRepository publisherRepository;
    private final UserService userService;

    // 회원가입
    @CrossOrigin
    @PostMapping("/signup/student")
    public int studentSignup(StudentCreateDto studentCreateDto) {
        userService.signupStudent(studentCreateDto,passwordEncoder);
        return studentCreateDto.getStudentId();
    }

    @CrossOrigin
    @PostMapping("/signup/publisher")
    public int publisherSignup(PublisherCreateDto publisherCreateDto) {
        userService.signupPublisher(publisherCreateDto,passwordEncoder);
        return publisherCreateDto.getPublisherId();
    }

    @CrossOrigin
    @PostMapping("/signup/student/dupcheck")
    public boolean studentIdDupCheck(String userId) {
        Student student = studentRepository.findByUserId(userId);
        if(student==null){ throw new IllegalArgumentException("사용 가능한 아이디 입니다.");}
        return true;
    }

    @CrossOrigin
    @PostMapping("/signup/publisher/dupcheck")
    public boolean publisherIdDupCheck(String publisherId) {
        Publisher publisher = publisherRepository.findByUserId(publisherId);
        if(publisher==null){ throw new IllegalArgumentException("사용 가능한 아이디 입니다.");}
        return true;
    }
        // 로그인
    @CrossOrigin
    @PostMapping("/login/student")
    public StudentResponseDto studentLogin(String id,String password) {

        Student student = studentRepository.findByUserId(id);
        if(student==null){ throw new IllegalArgumentException("가입되지 않은 아이디 입니다.");}

        if (!passwordEncoder.matches(id, student.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        jwtTokenProvider.createToken(student.getUsername());
        return new StudentResponseDto(student);
    }

    @CrossOrigin
    @PostMapping("/login/publisher")
    public PublisherResponseDto publisherLogin(String id,String password) {

        Publisher publisher = publisherRepository.findByUserId(id);
        if(publisher==null){throw new IllegalArgumentException("가입되지 않은 아이디 입니다.");}

        if (!passwordEncoder.matches(password, publisher.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        jwtTokenProvider.createToken(publisher.getUsername());
        return new PublisherResponseDto(publisher);
    }

    //프로필 업데이트
    @CrossOrigin
    @PutMapping("/student/profile")
    public int studentProfileUpdate(int studentId, @RequestBody StudentUpdateRequestDto studentUpdateRequestDto){
        return userService.studentUpdate(studentId,studentUpdateRequestDto);
    }

    @CrossOrigin
    @GetMapping("/publisher/profile")
    public Publisher publisherDispProfile(int publisherId){
        return publisherRepository.findById(publisherId)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
    }

    @CrossOrigin
    @GetMapping("/student/profile")
    public Student studentDispProfile(int studentId){
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
    }
}