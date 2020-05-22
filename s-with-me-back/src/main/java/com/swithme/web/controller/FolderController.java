package com.swithme.web.controller;

import com.swithme.service.FolderService;
import com.swithme.web.dto.FolderCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FolderController {
    private final FolderService folderService;
    @CrossOrigin
    @PostMapping("/student/library/folder")
    public String createFolder(FolderCreateDto folderCreateDto)
    {
        folderService.createFolder(folderCreateDto);
        return folderCreateDto.getFolderName();
    }

}
