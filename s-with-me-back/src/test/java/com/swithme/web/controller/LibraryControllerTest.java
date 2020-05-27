package com.swithme.web.controller;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.MyBookUpdateRequestDto;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LibraryControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private BookRepository bookRepository;

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
        Folder folder = folderRepository.findAll().get(0);

        for(int i = 0; i < 3; i++) {
            bookRepository.save(new Book());
            Book book = bookRepository.findAll().get(i);
            myBookRepository.save(MyBook.builder()
                    .folder(folder)
                    .book(book)
                    .lastPageNumber((short)1)
                    .build());
        }
    }

    @After
    public void cleanup(){
        myBookRepository.deleteAll();
        folderRepository.deleteAll();
        bookRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    public void getMyBookListTest() throws Exception{
        List<Student> studentList = studentRepository.findAll();
        Student student = studentList.get(0);

        MyBookUpdateRequestDto requestDto = MyBookUpdateRequestDto.builder()
                .lastPageNumber((short)1)
                .build();

        String url = "http://localhost:" + port + "/student/library?studentId=" + student.getStudentId();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

}
