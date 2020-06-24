package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final StudentRepository studentRepository;
    private final PublisherRepository publisherRepository;
    private final FolderRepository folderRepository;
    private final BookRepository bookRepository;

    @Transactional
    public void signupStudent(StudentCreateDto studentCreateDto, PasswordEncoder passwordEncoder)
    {
        studentRepository.save(Student.builder()
                .userId(studentCreateDto.getUserId())
                .name(studentCreateDto.getUserId())
                .password(passwordEncoder.encode(studentCreateDto.getPassword()))
                .phoneNumber(studentCreateDto.getPhoneNumber())
                .birthday(studentCreateDto.getBirthday())
                .grade(studentCreateDto.getGrade())
                .isSubscribing(false)
                .payDateTime(null)
                .build());
        Student student=studentRepository.findByUserId(studentCreateDto.getUserId());
        folderRepository.save(Folder.builder()
                .folderName("분류되지 않음")
                .student(student)
                .build());
    }

    @Transactional
    public void signupPublisher(PublisherCreateDto publisherCreateDto, PasswordEncoder passwordEncoder)
    {
        publisherRepository.save(Publisher.builder()
                .userId(publisherCreateDto.getUserId())
                .password(passwordEncoder.encode(publisherCreateDto.getPassword()))
                .name(publisherCreateDto.getName())
                .code(publisherCreateDto.getCode())
                .build());
    }

    @Transactional
    public int updateStudent(int studentId , StudentInfoUpdateRequestDto studentInfoUpdateRequestDto){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(()-> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));
        student.update(studentInfoUpdateRequestDto.getPhoneNumber(), studentInfoUpdateRequestDto.getGrade());

        return studentId;
    }

    @Transactional
    public int updateSubscription(int studentId, StudentSubscriptionUpdateRequestDto requestDto) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));
        student.update(requestDto.getIsSubscribing(), requestDto.getPayDateTime());

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

    @Transactional
    public MonthlyProfitAndSoldResponseDto getMonthlyProfitAndSold(int publisherId) {
        Publisher publisher = publisherRepository.findById(publisherId)
                .orElseThrow(() -> new IllegalArgumentException("해당 출판사가 없습니다."));
        List<Book> bookList = bookRepository.findByPublisher(publisher);
        Long monthlyProfit = 0L;
        Integer monthlySold = 0;

        for(Book book: bookList){
            monthlyProfit += book.getMonthlyProfit();
            monthlySold += book.getMonthlySold();
        }

        Long fee = monthlyProfit * 3 / 100;
        monthlyProfit -= fee;

        MonthlyProfitAndSoldResponseDto responseDto = MonthlyProfitAndSoldResponseDto.builder()
                .monthlyProfit(monthlyProfit)
                .monthlySold(monthlySold)
                .build();

        return responseDto;
    }

}
