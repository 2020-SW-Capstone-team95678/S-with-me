package com.swithme.web.dto;

import com.swithme.domain.myBook.MyBook;
import lombok.Getter;
import java.util.*;

@Getter
public class MyBookListResponseDto {

    private List<MyBook> myBookList;

    public MyBookListResponseDto(List<MyBook> myBookList){
        this.myBookList = myBookList;
    }
}
