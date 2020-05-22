package com.swithme.web.controller;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.service.FolderService;
import com.swithme.web.dto.FolderCreateDto;
import com.swithme.web.dto.FolderUpdateRequestDto;
import com.swithme.web.dto.StudentUpdateRequestDto;
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
    public int updateFolder(int folderId , FolderUpdateRequestDto folderUpdateRequestDto){
        return folderService.updatefolder(folderId, folderUpdateRequestDto);
    }

    @CrossOrigin
    @GetMapping("/student/library/folder/display")
    public List<Folder> dispFolderAll(int studentId)
    {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다. studentId="+ studentId));
        List<Folder> folderList = folderRepository.findByStudent(student);
        return folderList;
    }

    @CrossOrigin
    @DeleteMapping("/student/library/folder/delete")
    public int deleteFolder(int folderId)
    {
        folderRepository.deleteById(folderId);
        return folderId;
    }
}
