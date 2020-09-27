package com.swithme.domain.problem;

import com.swithme.domain.subChapter.SubChapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    List<Problem> findBySubChapter(SubChapter subChapter);
    Problem findByBeforeProblemId(Integer beforeProblemId);
}
