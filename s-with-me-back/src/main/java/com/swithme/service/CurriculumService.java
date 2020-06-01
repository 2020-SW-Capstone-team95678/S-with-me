package com.swithme.service;


import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.CurriculumCreateDto;
import com.swithme.web.dto.CurriculumResponseDto;
import com.swithme.web.dto.FolderResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.method.support.CompositeUriComponentsContributor;

import javax.swing.plaf.ComponentUI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CurriculumService {

    private final MyBookRepository myBookRepository;
    private final CurriculumRepository curriculumRepository;
    private final StudentRepository studentRepository;
    private final FolderRepository folderRepository;
    private final MyProblemRepository myProblemRepository;
    private final long standardMonday=1590332400000L; // 2020-5-25:00:00
    private final long milliSecPerWeek = 1000*60*60*24*7;
    private final long milliSecPerDay = 1000*60*60*24;
    @Transactional
    public int createCurriculum(CurriculumCreateDto curriculumCreateDto){
        MyBook myBook=myBookRepository.findById(curriculumCreateDto.getMyBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 존재하지 않습니다."));
        curriculumRepository.save(Curriculum.builder()
                .goalNumber(curriculumCreateDto.getGoalNumber())
                .myBook(myBook)
                .type(curriculumCreateDto.getType())
                .build());
        return myBook.getMyBookId();
    }

    @Transactional
    public List<CurriculumResponseDto> getCurriculumList(int studentId){
        Student student=studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다."));
        List<Folder> folderList=folderRepository.findByStudent(student);
        List<Curriculum> curriculumList = new ArrayList<>();
        List<MyBook> myBookList = new ArrayList<>();
        List<CurriculumResponseDto> curriculumResponseDtoList= new ArrayList<>();
        for(Folder folder : folderList)
        {
            myBookList.addAll(myBookRepository.findByFolder(folder));

        }
        for(MyBook myBook : myBookList)
        {
            curriculumList.add(curriculumRepository.findByMyBook(myBook));
        }
        for(Curriculum curriculum : curriculumList)
        {
            curriculumResponseDtoList.add(CurriculumResponseDto.builder()
                    .curriculumId(curriculum.getCurriculumId())
                    .goalNumber(curriculum.getGoalNumber())
                    .type(curriculum.getType())
                    .myBookId(curriculum.getMyBook().getMyBookId())
                    .build());
        }
        return curriculumResponseDtoList;
    }

    @Transactional
    public int getAchievement(int myBookId){
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 존재하지 않습니다."));
        Curriculum curriculum = curriculumRepository.findByMyBook(myBook);
        List<MyProblem> myProblemList = myProblemRepository.findByMyBook(myBook);

        int problemArchievement=0;
        long nowTime = System.currentTimeMillis();
        long Start,End;
        if(curriculum.getType().equals("Daily")) {
            Start = ((nowTime/milliSecPerDay)*milliSecPerDay);
            End = Start + milliSecPerDay -1;
        }
        else {
            Start = standardMonday + (((nowTime - standardMonday) / milliSecPerWeek) * milliSecPerWeek);
            End = Start + milliSecPerWeek - 1;
        }
        for(MyProblem myProblem : myProblemList)
        {
            if(Start<myProblem.getSolvedDateTime() && myProblem.getSolvedDateTime()<End)
            {
                problemArchievement++;
            }
        }
        return problemArchievement;
    }
}
