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
    private Book book;

    @Before
    public void setup(){
        studentRepository.save(Student.builder()
                .studentId(1)
                .userId("test id")
                .password("11")
                .name("11")
                .phoneNumber("11")
                .birthday("11")
                .grade((short)4)
                .build());
        Student student = studentRepository.findAll().get(0);

        folderRepository.save(Folder.builder()
                .student(student)
                .build());
        folder = folderRepository.findAll().get(0);

        publisherRepository.save(new Publisher());
        Publisher publisher = publisherRepository.findAll().get(0);

        bookRepository.save(Book.builder()
                .publisher(publisher)
                .build());
        book = bookRepository.findAll().get(0);

        myBookRepository.save(MyBook.builder()
                .folder(folder)
                .book(book)
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
        MyBook myBook1 = myBookRepository.findByFolder(folder).get(0);
        assertThat(myBook1.getFolder().getFolderId()).isEqualTo(folder.getFolderId());
        assertThat(myBook1.getBook().getBookId()).isEqualTo(book.getBookId());
    }
}
