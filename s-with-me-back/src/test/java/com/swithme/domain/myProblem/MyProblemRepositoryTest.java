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
    private Problem problem;

    @Before
    public void setup(){
        myBookRepository.save(new MyBook());
        myBook = myBookRepository.findAll().get(0);

        problemRepository.save(new Problem());
        problem = problemRepository.findAll().get(0);

        myProblemRepository.save(MyProblem.builder()
                .myBook(myBook)
                .problem(problem)
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
        MyProblem myProblem =myProblemRepository.findByMyBook(myBook).get(0);
        assertThat(myProblem.getMyBook().getMyBookId()).isEqualTo(myBook.getMyBookId());
        assertThat(myProblem.getProblem().getProblemId()).isEqualTo(problem.getProblemId());
    }
}
