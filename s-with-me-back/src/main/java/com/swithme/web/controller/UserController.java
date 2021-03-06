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

import java.text.ParseException;

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
    public int signupStudent(StudentCreateDto studentCreateDto) {
        userService.signupStudent(studentCreateDto,passwordEncoder);
        return studentCreateDto.getStudentId();
    }

    @CrossOrigin
    @PostMapping("/signup/publisher")
    public int signupPublisher(PublisherCreateDto publisherCreateDto) {
        userService.signupPublisher(publisherCreateDto,passwordEncoder);
        return publisherCreateDto.getPublisherId();
    }

    @CrossOrigin
    @PostMapping("/signup/student/dupcheck")
    public boolean checkDupStudentId(String userId) {
        Student student = studentRepository.findByUserId(userId);
        if(student==null) return true;
        else return false;
    }

    @CrossOrigin
    @PostMapping("/signup/publisher/dupcheck")
    public boolean checkDupPublisherId(String userId) {
        Publisher publisher = publisherRepository.findByUserId(userId);
        if(publisher==null) return true;
        else return false;
    }
        // 로그인
    @CrossOrigin
    @PostMapping("/login/student")
    public StudentResponseDto loginStudent(String id, String password) throws ParseException {

        Student student = studentRepository.findByUserId(id);
        if(student==null){ throw new IllegalArgumentException("가입되지 않은 아이디 입니다.");}

        if (!passwordEncoder.matches(password, student.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        jwtTokenProvider.createToken(student.getUsername());
        if(student.getIsSubscribing()) student.checkSubscription();
        return new StudentResponseDto(student);
    }

    /*@CrossOrigin
    @GetMapping("/logout/")
    public Jws<Claims> logout(HttpServletRequest request)
    {
        return jwtTokenProvider.logout(request);
    }*/

    @CrossOrigin
    @PostMapping("/login/publisher")
    public PublisherResponseDto loginPublisher(String id, String password) {

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
    public int updateStudentProfile(int studentId, @RequestBody StudentInfoUpdateRequestDto studentInfoUpdateRequestDto){
        return userService.updateStudent(studentId, studentInfoUpdateRequestDto);
    }

    @CrossOrigin
    @PutMapping("/student/profile/subscription")
    public int updateSubscription(int studentId, @RequestBody StudentSubscriptionUpdateRequestDto requestDto){
        return userService.updateSubscription(studentId, requestDto);
    }

    @CrossOrigin
    @GetMapping("/publisher/profile")
    public Publisher getPublisherProfile(int publisherId){
        return publisherRepository.findById(publisherId)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
    }

    @CrossOrigin
    @GetMapping("/student/profile")
    public Student getStudentProfile(int studentId){
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
    }

    @CrossOrigin
    @GetMapping("/publisher/profile/profit")
    public MonthlyProfitAndSoldResponseDto getMonthlyProfitAndSold(@RequestParam("publisherId") int publisherId){
        return userService.getMonthlyProfitAndSold(publisherId);
    }
}