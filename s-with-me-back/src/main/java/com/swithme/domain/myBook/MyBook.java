package com.swithme.domain.myBook;

import com.swithme.domain.book.Book;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import com.swithme.web.dto.MybookFolderUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "myBook")
public class MyBook {

    FolderRepository folderRepository;
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

    @Column(name = "lastPageNumber")
    private short lastProblemNumber;

    @Builder
    public MyBook(Folder folder, Book book, short lastProblemNumber){
        this.folder = folder;
        this.book = book;
        this.lastProblemNumber = lastProblemNumber;
    }

    public void updateLastProblemNumber(MyBookUpdateRequestDto requestDto) {
        this.lastProblemNumber = requestDto.getLastProblemNumber();
    }

    public void updateFolder(Folder folder) {
        this.folder = folder;
    }
}
