package com.swithme.service;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.FolderCreateDto;
import com.swithme.web.dto.FolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final StudentRepository studentRepository;

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
    public int updatefolder(int folderId , FolderUpdateRequestDto folderUpdateRequestDto){
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(()-> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        folder.update(folderUpdateRequestDto.getFolderName());
        return folderId;
    }
}
