package com.swithme.service;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.MyBookListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class LibraryService {

    private final FolderRepository folderRepository;
    private final MyBookRepository myBookRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public MyBookListResponseDto findMyBookList(int studentId){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다. studentId="+ studentId));
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBook> myBookList = new ArrayList<MyBook>();
        for(Folder folder : folderList){
            List<MyBook> tempMyBookList = myBookRepository.findByFolder(folder);
            myBookList.addAll(tempMyBookList);
        }

        return new MyBookListResponseDto(myBookList);
    }
}
