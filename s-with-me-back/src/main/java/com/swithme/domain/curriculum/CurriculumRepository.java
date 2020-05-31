package com.swithme.domain.curriculum;

import com.swithme.domain.myBook.MyBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurriculumRepository extends JpaRepository<Curriculum,Integer> {
    List<Curriculum> findByMyBook(MyBook myBook);
}
