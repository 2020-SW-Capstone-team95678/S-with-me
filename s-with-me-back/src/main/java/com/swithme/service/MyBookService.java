package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.MyBookCreateDto;
import com.swithme.web.dto.MyBookResponseDto;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import com.swithme.web.dto.MybookFolderUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MyBookService {

    private final MyBookRepository myBookRepository;
    private final FolderRepository folderRepository;
    private final BookRepository bookRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public String bringUpToDate(int myBookId, MyBookUpdateRequestDto requestDto) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        myBook.bringUpToDate(requestDto);
        return "문제집의 최근 페이지 번호가 업데이트 되었습니다.";
    }

    @Transactional
    public String createMyBook(MyBookCreateDto myBookCreateDto)
    {
        Folder folder = folderRepository.findById(myBookCreateDto.getFolderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 폴더가 없습니다. folderId=" + myBookCreateDto.getFolderId()));
        Book book = bookRepository.findById(myBookCreateDto.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 없습니다. myBookId=" + myBookCreateDto.getBookId()));
        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .book(book)
                .lastSubChapterId(0)
                .lastPageNumber(myBookCreateDto.getLastPageNumber())
                .build());
        return "mybook 생성 완료";
    }

    @Transactional
    public int updateFolder(int myBookId, MybookFolderUpdateRequestDto requestDto){
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        Folder folder = folderRepository.findById(requestDto.getFolderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 폴더가 없습니다. folderId=" + requestDto.getFolderId()));
        myBook.updateFolder(folder);
        return requestDto.getFolderId();
    }

    @Transactional
    public List<MyBookResponseDto> findMyBookList(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다. studentId="+ studentId));
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBookResponseDto> responseDtoList = new ArrayList<>();
        for(Folder folder : folderList){
            List<MyBook> myBookList = myBookRepository.findByFolder(folder);
            for(MyBook myBook : myBookList){
                responseDtoList.add(MyBookResponseDto.builder()
                        .myBookId(myBook.getMyBookId())
                        .bookId(myBook.getBook().getBookId())
                        .folderId(myBook.getFolder().getFolderId())
                        .lastSubChapterId(myBook.getLastSubChapterId())
                        .lastPageNumber(myBook.getLastPageNumber())
                        .build());
            }
        }
        return responseDtoList;
    }

    @Transactional
    public List<MyBookResponseDto> findMyBookListFilteredByFolder(int folderId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 폴더가 없습니다. folderId = " + folderId));
        List<MyBook> myBookList = myBookRepository.findByFolder(folder);
        List<MyBookResponseDto> responseDtoList = new ArrayList<>();
        for(MyBook myBook : myBookList){
            responseDtoList.add(MyBookResponseDto.builder()
                    .myBookId(myBook.getMyBookId())
                    .bookId(myBook.getBook().getBookId())
                    .folderId(myBook.getFolder().getFolderId())
                    .lastSubChapterId(myBook.getLastSubChapterId())
                    .lastPageNumber(myBook.getLastPageNumber())
                    .build());
        }
        return responseDtoList;
    }
}
