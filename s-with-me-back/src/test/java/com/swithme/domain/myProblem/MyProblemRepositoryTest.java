package com.swithme.domain.myProblem;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
@RunWith(SpringRunner.class)
@SpringBootTest
public class MyProblemRepositoryTest {

    @Autowired
    private MyProblemRepository myProblemRepository;
    @Autowired
    private MyBookRepository myBookRepository;
    @Autowired
    private ProblemRepository problemRepository;

    private MyBook myBook;
    private Problem problem1;
    private Problem problem2;

    @Before
    public void setup(){
        myBookRepository.save(new MyBook());
        problemRepository.save(new Problem());
        problemRepository.save(new Problem());

        List<MyBook> myBookList = myBookRepository.findAll();
        myBook = myBookList.get(0);

        List<Problem> problemList = problemRepository.findAll();
        problem1 = problemList.get(0);
        problem2 = problemList.get(1);

        myProblemRepository.save(MyProblem.builder()
                .myBook(myBook)
                .problem(problem1)
                .build());

        myProblemRepository.save(MyProblem.builder()
                .myBook(myBook)
                .problem(problem2)
                .build());
    }

    @After
    public void cleanup(){
        myProblemRepository.deleteAll();
        problemRepository.deleteAll();
        myBookRepository.deleteAll();
    }

    @Test
    public void findByMyBookTest() {
        List<MyProblem> myProblemList = myProblemRepository.findByMyBook(myBook);
        MyProblem myProblem1 = myProblemList.get(0);
        MyProblem myProblem2 = myProblemList.get(1);

        assertThat(myProblem1.getMyBook().getMyBookId()).isEqualTo(myBook.getMyBookId());
        assertThat(myProblem1.getProblem().getProblemId()).isEqualTo(problem1.getProblemId());

        assertThat(myProblem2.getMyBook().getMyBookId()).isEqualTo(myBook.getMyBookId());
        assertThat(myProblem2.getProblem().getProblemId()).isEqualTo(problem2.getProblemId());
    }
}
