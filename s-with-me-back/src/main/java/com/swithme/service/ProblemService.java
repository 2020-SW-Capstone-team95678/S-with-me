package com.swithme.service;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final SubChapterRepository subChapterRepository;

    @Transactional
    public ProblemResponseDto findById(int problemId) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 problem이 없습니다. problemId = " + problemId));
        ProblemResponseDto responseDto =  ProblemResponseDto.builder()
                .problemId(problem.getProblemId())
                .subChapterId(problem.getSubChapter().getSubChapterId())
                .content(problem.getContent())
                .solution(problem.getSolution())
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

    @Transactional
    public String createProblems(List<ProblemCreateDto> createDtoList) {
        for (ProblemCreateDto createDto : createDtoList) {
            SubChapter subChapter = subChapterRepository.findById(createDto.getSubChapterId())
                    .orElseThrow(() -> new IllegalArgumentException
                            ("해당 sub chapter가 없습니다. subChapterId = " + createDto.getSubChapterId()));
            problemRepository.save(Problem.builder()
                    .subChapter(subChapter)
                    .content(createDto.getContent())
                    .solution(createDto.getSolution())
                    .answer(createDto.getAnswer())
                    .problemNumber(createDto.getProblemNumber())
                    .isOptional(createDto.getIsOptional())
                    .option1(createDto.getOption1())
                    .option2(createDto.getOption2())
                    .option3(createDto.getOption3())
                    .option4(createDto.getOption4())
                    .option5(createDto.getOption5())
                    .build());
        }
        return "문제 등록이 완료되었습니다.";
    }
}
