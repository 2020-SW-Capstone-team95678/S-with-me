package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FolderCreateDto {
    int folderId;
    int studentId;
    String folderName;

    @Builder
    public FolderCreateDto(int folderId,int studentId,String folderName) {
        this.folderId = folderId;
        this.studentId = studentId;
        this.folderName = folderName;
    }
}