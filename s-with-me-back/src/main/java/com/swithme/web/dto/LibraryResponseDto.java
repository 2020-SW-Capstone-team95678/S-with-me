package com.swithme.web.dto;

import com.swithme.domain.myBook.MyBook;
import lombok.Getter;
import java.util.*;

@Getter
public class LibraryResponseDto {

    List<MyBook> myBookList;

    public LibraryResponseDto(List<MyBook> myBookList){
        this.myBookList = myBookList;
    }
}
