package com.swithme.domain.myBook;

import com.swithme.domain.book.Book;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.note.Note;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "myBook")
public class MyBook implements Comparable<MyBook>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myBookId")
    private int myBookId;

    @ManyToOne
    @JoinColumn(name = "folderId")
    private Folder folder;

    @OneToOne
    @JoinColumn(name= "bookId")
    private Book book;

    @Column(name = "lastSubChapterId")
    private int lastSubChapterId;

    @Column(name = "lastPageNumber")
    private short lastPageNumber;

    @Column(name = "receiptId")
    private String receiptId;

    @Builder
    public MyBook(Folder folder, Book book, int lastSubChapterId, short lastPageNumber,String receiptId){
        this.folder = folder;
        this.book = book;
        this.lastSubChapterId = lastSubChapterId;
        this.lastPageNumber = lastPageNumber;
        this.receiptId = receiptId;
    }

    public void bringUpToDate(MyBookUpdateRequestDto requestDto) {
        this.lastSubChapterId = requestDto.getLastSubChapterId();
        this.lastPageNumber = requestDto.getLastPageNumber();
    }

    public void updateFolder(Folder folder) {
        this.folder = folder;
    }

    @Override
    public int compareTo(MyBook myBook){
        Integer myBookId = myBook.getMyBookId();
        return myBookId.compareTo(this.myBookId);
    }

}
