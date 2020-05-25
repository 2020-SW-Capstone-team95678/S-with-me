package com.swithme.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FolderUpdateRequestDto {

    private String folderName;

    @Builder
    public FolderUpdateRequestDto( String folderName) {
        this. folderName = folderName;
    }
}