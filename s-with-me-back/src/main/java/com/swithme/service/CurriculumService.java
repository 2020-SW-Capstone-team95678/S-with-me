package com.swithme.service;


import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
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
import java.util.List;

@RequiredArgsConstructor
@Service
public class CurriculumService {

    private final MyBookRepository myBookRepository;
    private final CurriculumRepository curriculumRepository;
    private final StudentRepository studentRepository;
    private final FolderRepository folderRepository;

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
            curriculumList.addAll(curriculumRepository.findByMyBook(myBook));
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
}
