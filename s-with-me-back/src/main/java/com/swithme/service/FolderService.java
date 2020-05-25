package com.swithme.service;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.FolderCreateDto;
import com.swithme.web.dto.FolderResponseDto;
import com.swithme.web.dto.FolderUpdateRequestDto;
import com.swithme.web.dto.MybookFolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final StudentRepository studentRepository;
    private final MyBookRepository myBookRepository;
    @Transactional
    public String createFolder(FolderCreateDto folderCreateDto)
    {
        Student student = studentRepository.findById(folderCreateDto.getStudentId())
                .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        folderRepository.save(Folder.builder()
                .student(student)
                .folderName(folderCreateDto.getFolderName())
                .build());
        return folderCreateDto.getFolderName();
    }

    @Transactional
    public List<FolderResponseDto> getFolder(Student student)
    {
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<FolderResponseDto> folderResponseDtoList = new ArrayList<>();
        for( Folder folder : folderList)
        {
            folderResponseDtoList.add(FolderResponseDto.builder()
                    .folderId(folder.getFolderId())
                    .folderName(folder.getFolderName())
                    .build());
        }
        return folderResponseDtoList;
    }
    @Transactional
    public String updateFolder(int folderId , FolderUpdateRequestDto folderUpdateRequestDto){
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(()-> new IllegalArgumentException("폴더를 찾을 수 없습니다."));
        if(folder.getFolderName().equals("분류되지 않음")){throw new IllegalArgumentException("기본 폴더는 변경할 수 없습니다.");}
        folder.update(folderUpdateRequestDto.getFolderName());
        return folderUpdateRequestDto.getFolderName();
    }

    @Transactional
    public int deleteFolder(Folder folder) {
        Student student = folder.getStudent();
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBook> myBookList = myBookRepository.findByFolder(folder);
        for (Folder searchFolder : folderList) {
            if (searchFolder.getFolderName().equals("분류되지 않음")) {
                for (MyBook mybook : myBookList) {
                    mybook.updateFolder(searchFolder);
                }
            }
        }
        folderRepository.deleteById(folder.getFolderId());
        return student.getStudentId();
    }
}
