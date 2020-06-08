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
    int bookId;
    int studentId;
    String receiptId;

    @Builder
    public MyBookCreateDto(int myBookId,int bookId,String receiptId,int studentId) {
        this.myBookId = myBookId;
        this.bookId = bookId;
        this.receiptId = receiptId;
        this.studentId = studentId;
    }
}