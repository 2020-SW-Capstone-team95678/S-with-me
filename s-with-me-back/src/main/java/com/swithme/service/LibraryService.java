package com.swithme.service;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.MyBookResponseDto;
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
    public List<MyBookResponseDto> findMyBookList(int studentId){
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다. studentId="+ studentId));
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBookResponseDto> responseDtoList = new ArrayList<>();
        for(Folder folder : folderList){
            List<MyBook> myBookList = myBookRepository.findByFolder(folder);
            for(MyBook myBook : myBookList){
                responseDtoList.add(MyBookResponseDto.builder()
                        .myBookId(myBook.getMyBookId())
                        .bookId(myBook.getBook().getBookId())
                        .folderId(myBook.getFolder().getFolderId())
                        .lastPageNumber(myBook.getLastPageNumber())
                        .build());
            }
        }
        return responseDtoList;
    }
}
