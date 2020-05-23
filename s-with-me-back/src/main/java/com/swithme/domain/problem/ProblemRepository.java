package com.swithme.domain.problem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface ProblemRepository extends JpaRepository<Problem, Integer> {
}
