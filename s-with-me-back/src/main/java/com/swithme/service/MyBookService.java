package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MyBookService {

    private final MyBookRepository myBookRepository;
    private final FolderRepository folderRepository;
    private final BookRepository bookRepository;
    private final StudentRepository studentRepository;
    private final MyProblemRepository myProblemRepository;
    private final NoteRepository noteRepository;
    private final MainChapterRepository mainChapterRepository;
    private final SubChapterRepository subChapterRepository;
    @Transactional
    public MyBookResponseDto getMyBook(int myBookId){
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        return MyBookResponseDto.builder()
                .bookId(myBook.getBook().getBookId())
                .folderId(myBook.getFolder().getFolderId())
                .lastPageNumber(myBook.getLastPageNumber())
                .lastSubChapterId(myBook.getLastSubChapterId())
                .build();
    }

    @Transactional
    public String bringUpToDate(int myBookId, MyBookUpdateRequestDto requestDto) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId=" + myBookId));
        myBook.bringUpToDate(requestDto);
        return "문제집의 최근 페이지 번호가 업데이트 되었습니다.";
    }

    @Transactional
    public int createMyBook(MyBookCreateDto myBookCreateDto)
    {
        Student student = studentRepository.findById(myBookCreateDto.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId="+myBookCreateDto.getStudentId()));
        Book book = bookRepository.findById(myBookCreateDto.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 없습니다. myBookId=" + myBookCreateDto.getBookId()));

        book.sold();

        List<Folder> folderList = folderRepository.findByStudent(student);
        Folder defaultFolder = new Folder();
        for(Folder folder : folderList)
        {
            if(folder.getFolderName().equals("분류되지 않음")){defaultFolder=folder;break;}
        }

        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        MainChapter firstMainChapter = new MainChapter();
        for(MainChapter mainChapter : mainChapterList)
        {
            if(mainChapter.getBeforeMainChapterId()==0){firstMainChapter=mainChapter;break;}
        }

        List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(firstMainChapter);
        SubChapter firstSubChapter = new SubChapter();
        for(SubChapter subChapter : subChapterList)
        {
            if(subChapter.getBeforeSubChapterId()==0){firstSubChapter=subChapter;}
        }

        myBookRepository.save(MyBook.builder()
                .folder(defaultFolder)
                .book(book)
                .lastSubChapterId(firstSubChapter.getSubChapterId())
                .lastPageNumber((short) 1)
                .receiptId(myBookCreateDto.getReceiptId())
                .build());

        int last = myBookRepository.findAll().size() - 1;
        int createdMyBookId = myBookRepository.findAll().get(last).getMyBookId();

        return createdMyBookId;
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
        List<MyBook> myBookList = new ArrayList<>();
        List<MyBookResponseDto> responseDtoList = new ArrayList<>();

        for(Folder folder : folderList)
            myBookList.addAll(myBookRepository.findByFolder(folder));
        if(myBookList.size() > 1) Collections.sort(myBookList);

        for(MyBook myBook : myBookList) {
            responseDtoList.add(MyBookResponseDto.builder()
                    .myBookId(myBook.getMyBookId())
                    .bookId(myBook.getBook().getBookId())
                    .folderId(myBook.getFolder().getFolderId())
                    .receiptId(myBook.getReceiptId())
                    .lastSubChapterId(myBook.getLastSubChapterId())
                    .lastPageNumber(myBook.getLastPageNumber())
                    .build());
        }

        return responseDtoList;
    }

    @Transactional
    public List<MyBookResponseDto> findMyBookListFilteredByFolder(int folderId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 폴더가 없습니다. folderId = " + folderId));
        List<MyBook> myBookList = myBookRepository.findByFolder(folder);

        if(myBookList.size() > 1) Collections.sort(myBookList);

        List<MyBookResponseDto> responseDtoList = new ArrayList<>();
        for(MyBook myBook : myBookList){
            responseDtoList.add(MyBookResponseDto.builder()
                    .myBookId(myBook.getMyBookId())
                    .bookId(myBook.getBook().getBookId())
                    .receiptId(myBook.getReceiptId())
                    .folderId(myBook.getFolder().getFolderId())
                    .lastSubChapterId(myBook.getLastSubChapterId())
                    .lastPageNumber(myBook.getLastPageNumber())
                    .build());
        }

        return responseDtoList;
    }

    @Transactional
    public String deleteMyBook(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId = " + myBookId));
        String myBookName = myBook.getBook().getName();
        List<MyProblem> myProblemList = myProblemRepository.findByMyBook(myBook);

        for(MyProblem myProblem : myProblemList){
            if(noteRepository.findByMyProblem(myProblem) != null){
                noteRepository.delete(noteRepository.findByMyProblem(myProblem));
            }
            myProblemRepository.delete(myProblem);
        }
        myBookRepository.delete(myBook);

        return myBookName + " 문제집과 그에 관련된 문제, 오답노트가 삭제되었습니다.";
    }

    @Transactional
    public List<MyBookResponseDto> findMyBookListFilteredBySubject(int studentId, String subject) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBook> myBookList = new ArrayList<>();
        List<MyBookResponseDto> responseDtoList = new ArrayList<>();

        for(Folder folder: folderList){
            List<MyBook> myBookListInFolder = myBookRepository.findByFolder(folder);
            myBookList.addAll(myBookListInFolder);
        }

        if(myBookList.size() > 1) Collections.sort(myBookList);

        for(MyBook myBook : myBookList){
            if(myBook.getBook().getSubject().equals(subject)){
                responseDtoList.add(MyBookResponseDto.builder()
                        .myBookId(myBook.getMyBookId())
                        .bookId(myBook.getBook().getBookId())
                        .receiptId(myBook.getReceiptId())
                        .folderId(myBook.getFolder().getFolderId())
                        .lastSubChapterId(myBook.getLastSubChapterId())
                        .lastPageNumber(myBook.getLastPageNumber())
                        .build());
            }
        }

        return responseDtoList;
    }

    @Transactional
    public List<MyBookResponseDto> findMyBookListByAlphabetOrder(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다. studentId="+ studentId));
        List<Folder> folderList = folderRepository.findByStudent(student);
        List<MyBook> myBookList = new ArrayList<>();
        List<MyBookResponseDto> responseDtoList = new ArrayList<>();

        for(Folder folder : folderList)
            myBookList.addAll(myBookRepository.findByFolder(folder));

        if(myBookList.size() > 1) {
            Collections.sort(myBookList, new Comparator<MyBook>() {
                @Override
                public int compare(MyBook m1, MyBook m2) {
                    Book b1=m1.getBook();
                    Book b2=m2.getBook();
                    return b1.getName().compareTo(b2.getName());
                }
            });
        }

        for(MyBook myBook : myBookList) {
            responseDtoList.add(MyBookResponseDto.builder()
                    .myBookId(myBook.getMyBookId())
                    .bookId(myBook.getBook().getBookId())
                    .folderId(myBook.getFolder().getFolderId())
                    .receiptId(myBook.getReceiptId())
                    .lastSubChapterId(myBook.getLastSubChapterId())
                    .lastPageNumber(myBook.getLastPageNumber())
                    .build());
        }

        return responseDtoList;
    }
}
