package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FolderResponseDto {
    private int folderId;
    private String folderName;

    @Builder
    public FolderResponseDto(int folderId , String folderName){
        this.folderId = folderId;
        this.folderName = folderName;
    }
}
