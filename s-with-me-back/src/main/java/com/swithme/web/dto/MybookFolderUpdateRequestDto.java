package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MybookFolderUpdateRequestDto {

    private int folderId;

    @Builder
    public MybookFolderUpdateRequestDto(int folderId){
        this.folderId=folderId;
    }
}
