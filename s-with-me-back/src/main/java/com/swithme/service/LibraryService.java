package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.LibraryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class LibraryService {

    private final FolderRepository folderRepository;
    private final BookRepository bookRepository;
    private final MyBookRepository myBookRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public LibraryResponseDto findMyBookList(Student student){
        studentRepository.save(student);
        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("test folder 1")
                .build());
        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("test folder 2")
                .build());

        bookRepository.save(Book.builder()
                .subject("test subject 1")
                .price((short)12345)
                .publishedDate("2020-02-02")
                .name("test book name 1")
                .grade((short)4)
                .cover("test cover 1")
                .isAdvertised(true)
                .build());
        bookRepository.save(Book.builder()
                .subject("test subject 2")
                .price((short)12345)
                .publishedDate("2020-02-02")
                .name("test book name 2")
                .grade((short)4)
                .cover("test cover 2")
                .isAdvertised(true)
                .build());

        List<Folder> folderData = folderRepository.findAll();
        List<Book> bookData = bookRepository.findAll();

        myBookRepository.save(MyBook.builder()
                .folder(folderData.get(0))
                .book(bookData.get(0))
                .build());
        myBookRepository.save(MyBook.builder()
                .folder(folderData.get(1))
                .book(bookData.get(1))
                .build());

        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBook> myBookList = new ArrayList<MyBook>();
        for(Folder folder : folderList){
            myBookList.add(myBookRepository.findByFolder(folder));
        }

        return new LibraryResponseDto(myBookList);
    }
}
