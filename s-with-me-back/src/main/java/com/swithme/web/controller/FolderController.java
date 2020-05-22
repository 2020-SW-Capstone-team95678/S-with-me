package com.swithme.web.controller;

import com.swithme.service.FolderService;
import com.swithme.web.dto.FolderCreateDto;
import com.swithme.web.dto.FolderUpdateRequestDto;
import com.swithme.web.dto.StudentUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @CrossOrigin
    @PutMapping("/student/library/folder")
    public int updateFolder(int folderId , FolderUpdateRequestDto folderUpdateRequestDto){
        return folderService.updatefolder(folderId, folderUpdateRequestDto);
    }
}
