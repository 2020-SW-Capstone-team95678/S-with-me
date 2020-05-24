package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FolderResponseDto {
    private int folderId;
    private String folderName;
    private int studentId;

    @Builder
    public FolderResponseDto(int folderId , String folderName,int studentId){
        this.folderId = folderId;
        this.folderName = folderName;
        this.studentId = studentId;
    }
}
