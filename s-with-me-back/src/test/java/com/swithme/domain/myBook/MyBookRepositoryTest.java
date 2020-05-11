package com.swithme.domain.myBook;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import net.bytebuddy.description.type.TypeDescription;
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

    @Before
    public void setup(){
        studentRepository.save(Student.builder()
                .id("test id")
                .password("test password")
                .birthDay("2020-02-02")
                .phoneNumber("123-456-7890")
                .name("test name")
                .grade((short)4)
                .build());

        publisherRepository.save(Publisher.builder()
                .id("test id")
                .password("test password")
                .name("test name")
                .code("test code")
                .build());

        List<Student> studentList = studentRepository.findAll();
        Student student = studentList.get(0);

        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("test folder name")
                .build());

        List<Publisher> publisherList = publisherRepository.findAll();
        Publisher publisher = publisherList.get(0);

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .subject("test subject")
                .price((short)12345)
                .publishedDate("test publishedDate")
                .name("test name")
                .grade((short)4)
                .cover("test cover")
                .isAdvertised(true)
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
    public void saveLoadMyBook(){

        List<Book> bookList = bookRepository.findAll();
        Book book = bookList.get(0);

        List<Folder> folderList = folderRepository.findAll();
        Folder folder = folderList.get(0);

        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .book(book)
                .build());

        List<MyBook> myBookList = myBookRepository.findAll();
        MyBook myBook = myBookList.get(0);

        assertThat(myBook.getFolder().getFolderId()).isEqualTo(folder.getFolderId());
        assertThat(myBook.getBook().getBookId()).isEqualTo(book.getBookId());
    }
}
