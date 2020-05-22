package com.swithme.service;

import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.PublisherCreateDto;
import com.swithme.web.dto.StudentCreateDto;
import com.swithme.web.dto.StudentUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final StudentRepository studentRepository;
    private final PublisherRepository publisherRepository;
    //private final PasswordEncoder passwordEncoder;

    @Transactional
    public int signupStudent(StudentCreateDto studentCreateDto,PasswordEncoder passwordEncoder)
    {
        studentRepository.save(Student.builder()
                .userId(studentCreateDto.getUserId())
                .name(studentCreateDto.getUserId())
                .password(passwordEncoder.encode(studentCreateDto.getPassword()))
                .phoneNumber(studentCreateDto.getPhoneNumber())
                .birthday(studentCreateDto.getBirthday())
                .grade(studentCreateDto.getGrade())
                .build());
        return studentCreateDto.getStudentId();
    }

    @Transactional
    public int signupPublisher(PublisherCreateDto publisherCreateDto, PasswordEncoder passwordEncoder)
    {
        publisherRepository.save(Publisher.builder()
                .userId(publisherCreateDto.getId())
                .password(passwordEncoder.encode(publisherCreateDto.getPassword()))
                .name(publisherCreateDto.getName())
                .code(publisherCreateDto.getCode())
                .build());
        return publisherCreateDto.getPublisherId();
    }

    @Transactional
    public int studentUpdate(int studentId , StudentUpdateRequestDto studentUpdateRequestDto){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        student.update(studentUpdateRequestDto.getPhoneNumber(),studentUpdateRequestDto.getGrade());

        return studentId;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Student student = studentRepository.findByUserId(username) ;
        Publisher publisher = publisherRepository.findByUserId(username);
        if(student==null){
            return publisherRepository.findById(publisher.getPublisherId())
                    .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        }
        return student;
    }
}
