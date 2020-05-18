package com.swithme.domain.myBook;

import com.swithme.domain.book.Book;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.myProblem.MyProblem;
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

    @OneToOne
    @JoinColumn(name = "lastMyProblemId")
    private MyProblem lastMyProblem;

    @Builder
    public MyBook(Folder folder, Book book, MyProblem lastMyProblem){
        this.folder = folder;
        this.book = book;
        this.lastMyProblem = lastMyProblem;
    }
}
