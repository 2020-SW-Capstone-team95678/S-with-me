package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FolderUpdateRequestDto {

    String folderName;

    @Builder
    public FolderUpdateRequestDto( String folderName) {
        this. folderName = folderName;
    }
}