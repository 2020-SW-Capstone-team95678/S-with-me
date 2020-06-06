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
    short lastPageNumber;
    String receiptId;

    @Builder
    public MyBookCreateDto(int myBookId,int folderId,int bookId, short lastPageNumber,String receiptId) {
        this.myBookId = myBookId;
        this.folderId = folderId;
        this.bookId = bookId;
        this.lastPageNumber = lastPageNumber;
        this.receiptId = receiptId;
    }
}