package com.swithme.service;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.web.dto.ProblemResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    @Transactional
    public ProblemResponseDto findById(int problemId) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 problem이 없습니다. problemId = " + problemId));
        ProblemResponseDto responseDto =  ProblemResponseDto.builder()
                .problemId(problem.getProblemId())
                .subChapterId(problem.getSubChapter().getSubChapterId())
                .content(problem.getContent())
                .solution(problem.getSolution())
                .pageNumber(problem.getPageNumber())
                .problemNumber(problem.getProblemNumber())
                .answer(problem.getAnswer())
                .isOptional(problem.getIsOptional())
                .option1(problem.getOption1())
                .option2(problem.getOption2())
                .option3(problem.getOption3())
                .option4(problem.getOption4())
                .option5(problem.getOption5())
                .build();
        return responseDto;
    }
}
