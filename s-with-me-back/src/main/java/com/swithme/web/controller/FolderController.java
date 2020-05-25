package com.swithme.web.controller;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.service.FolderService;
import com.swithme.web.dto.FolderCreateDto;
import com.swithme.web.dto.FolderResponseDto;
import com.swithme.web.dto.FolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FolderController {
    private final FolderService folderService;
    private final FolderRepository folderRepository;
    private final StudentRepository studentRepository;
    @CrossOrigin
    @PostMapping("/student/library/folder")
    public String createFolder(FolderCreateDto folderCreateDto)
    {
        folderService.createFolder(folderCreateDto);
        return folderCreateDto.getFolderName();
    }

    @CrossOrigin
    @PutMapping("/student/library/folder")
    public String updateFolder(int folderId , String folderName){
        FolderUpdateRequestDto folderUpdateRequestDto = new FolderUpdateRequestDto();
        folderUpdateRequestDto.setFolderName(folderName);
        return folderService.updateFolder(folderId, folderUpdateRequestDto);
    }

    @CrossOrigin
    @GetMapping("/student/library/folder/display")
    public List<FolderResponseDto> getFolderAll(int studentId)
    {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다. studentId="+ studentId));
        return folderService.getFolder(student);
    }

    @CrossOrigin
    @DeleteMapping("/student/library/folder/delete")
    public int deleteFolder(int folderId)
    {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new IllegalArgumentException("폴더가 존재하지 않습니다. studentId="+ folderId));
        if(folder.getFolderName().equals("분류되지 않음")){throw new IllegalArgumentException("기본 폴더는 삭제할 수 없습니다.");}
        return folderService.deleteFolder(folder);
    }
}
