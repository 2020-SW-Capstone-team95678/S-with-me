package com.swithme.service;

import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.StudentResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Transactional
    public StudentResponseDto findById(int studentId) {
        //임의로 테스트하기 위한 Student 정보
        Student student = studentRepository.save(Student.builder()
                .id("id")
                .password("password")
                .birthDay("2020-02-02")
                .phoneNumber("123-456-7890")
                .name("name")
                .grade((short)4)
                .build());

        Student entity = studentRepository.findById(student.getStudentId()).orElseThrow(() -> new IllegalArgumentException("해당 ID가 없습니다. id = " + studentId));
        return new StudentResponseDto(entity);
    }
}
