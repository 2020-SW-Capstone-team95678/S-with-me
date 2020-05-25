package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.publisher.Publisher;
import com.swithme.domain.publisher.PublisherRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FolderControllerTest {
    @LocalServerPort
    private int port;
    private Student student;
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Before
    public void setup()
    {
        studentRepository.save(Student.builder()
                .studentId(1)
                .userId("test id")
                .password("11")
                .name("11")
                .phoneNumber("11")
                .birthday("11")
                .grade((short)4)
                .build());
        student = studentRepository.findAll().get(0);

        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("분류되지 않음")
                .build());

        folderRepository.save(Folder.builder()
                .student(student)
                .folderName("bbb")
                .build());

        publisherRepository.save(new Publisher());
        bookRepository.save(Book.builder()
                .publisher(publisherRepository.findAll().get(0))
                .build());
        myBookRepository.save(MyBook.builder()
                .book(bookRepository.findAll().get(0))
                .folder(folderRepository.findAll().get(1))
                .build());
    }

    @After
    public void cleanup()
    {
        myBookRepository.deleteAll();
        bookRepository.deleteAll();
        publisherRepository.deleteAll();
        folderRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void getFolderTest()
    {
        String url="http://localhost:"+port+"/student/library/folder/display?studentId="+student.getStudentId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @Ignore
    public void deleteFolderTest(){
        //assertThat(folderRepository.findAll().get(1).getFolderId()).isEqualTo(2);
        String url="http://localhost:"+port+"/student/library/folder/delete?folderId="+2;
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        //assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        //assertThat(folderRepository.findAll().get(0).getFolderName()).isEqualTo("분류되지 않음");
        //assertThat(myBookRepository.findAll().get(0).getFolder().getFolderName()).isEqualTo("분류되지 않음");
    }
}
