package com.swithme.domain.problem;

import com.swithme.domain.chapter.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    List<Problem> findByChapter(Chapter chapter);
}
