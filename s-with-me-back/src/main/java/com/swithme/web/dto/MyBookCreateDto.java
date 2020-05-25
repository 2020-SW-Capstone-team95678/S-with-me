package com.swithme.web.dto;

import com.swithme.domain.book.Book;
import com.swithme.domain.folder.Folder;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MyBookCreateDto {
    int myBookId;
    int folderId;
    int bookId;
    int lastProblemId;

    @Builder
    public MyBookCreateDto(int myBookId,int folderId,int bookId,int lastProblemId) {
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastProblemId = lastProblemId;
    }
}