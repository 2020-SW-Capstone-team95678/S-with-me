package com.swithme.domain.myBook;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MyBookRepositoryTest {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private BookRepository bookRepository;

    private Folder folder;
    private Book book1;
    private Book book2;

    @Before
    public void setup(){
        studentRepository.save(new Student());
        publisherRepository.save(new Publisher());

        List<Student> studentList = studentRepository.findAll();
        Student student = studentList.get(0);

        folderRepository.save(Folder.builder()
                .student(student)
                .build());

        List<Publisher> publisherList = publisherRepository.findAll();
        Publisher publisher = publisherList.get(0);

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .build());

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .build());

        List<Folder> folderList = folderRepository.findAll();
        folder = folderList.get(0);

        List<Book> bookList = bookRepository.findAll();
        book1 = bookList.get(0);
        book2 = bookList.get(1);

        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .book(book1)
                .build());

        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .book(book2)
                .build());
    }

    @After
    public void cleanup(){
        myBookRepository.deleteAll();
        bookRepository.deleteAll();
        folderRepository.deleteAll();
        studentRepository.deleteAll();
        publisherRepository.deleteAll();
    }

    @Test
    public void findByFolderTest(){
        List<MyBook> myBookList = myBookRepository.findByFolder(folder);

        MyBook myBook1 = myBookList.get(0);
        MyBook myBook2 = myBookList.get(1);

        assertThat(myBook1.getFolder().getFolderId()).isEqualTo(folder.getFolderId());
        assertThat(myBook1.getBook().getBookId()).isEqualTo(book1.getBookId());

        assertThat(myBook2.getFolder().getFolderId()).isEqualTo(folder.getFolderId());
        assertThat(myBook2.getBook().getBookId()).isEqualTo(book2.getBookId());
    }
}
