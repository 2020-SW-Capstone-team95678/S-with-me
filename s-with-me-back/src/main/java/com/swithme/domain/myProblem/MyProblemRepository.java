package com.swithme.domain.myProblem;

import com.swithme.domain.myBook.MyBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface MyProblemRepository extends JpaRepository<MyProblem, Integer> {
    List<MyProblem> findByMyBook(MyBook myBook);
}
