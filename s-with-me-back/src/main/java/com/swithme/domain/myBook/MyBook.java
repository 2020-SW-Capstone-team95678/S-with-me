package com.swithme.domain.myBook;

import com.swithme.domain.book.Book;
import com.swithme.domain.folder.Folder;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "myBook")
public class MyBook {
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

    @Column(name = "subChapterId")
    private int lastSubChapterId;

    @Column(name = "lastPageNumber")
    private short lastPageNumber;

    @Builder
    public MyBook(Folder folder, Book book, int lastSubChapterId, short lastPageNumber){
        this.folder = folder;
        this.book = book;
        this.lastSubChapterId = lastSubChapterId;
        this.lastPageNumber = lastPageNumber;
    }

    public void bringUpToDate(MyBookUpdateRequestDto requestDto) {
        this.lastSubChapterId = requestDto.getLastSubChapterId();
        this.lastPageNumber = requestDto.getLastPageNumber();
    }

    public void updateFolder(Folder folder) {
        this.folder = folder;
    }
}
