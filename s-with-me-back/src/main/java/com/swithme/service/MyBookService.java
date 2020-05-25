package com.swithme.service;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import com.swithme.web.dto.MybookFolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MyBookService {

    private final MyBookRepository myBookRepository;
    private final FolderRepository folderRepository;
    @Transactional
    public String updateLastProblemNumber(int myBookId, MyBookUpdateRequestDto requestDto) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        myBook.updateLastProblemNumber(requestDto);
        return "문제집의 최근 페이지 번호가 업데이트 되었습니다.";
    }

    @Transactional
    public int updateFolder(int myBookId, MybookFolderUpdateRequestDto requestDto){
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        Folder folder = folderRepository.findById(requestDto.getFolderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 폴더가 없습니다."));
        myBook.updateFolder(folder);
        return requestDto.getFolderId();
    }
}
