package com.swithme.service;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemResponseDto;
import com.swithme.web.dto.ProblemUpdateRequestDto;
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
                .title(problem.getTitle())
                .content(problem.getContent())
                .solution(problem.getSolution())
                .image(problem.getImage())
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
                    .title(createDto.getTitle())
                    .content(createDto.getContent())
                    .solution(createDto.getSolution())
                    .answer(createDto.getAnswer())
                    .image(createDto.getImage())
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

    @Transactional
    public String updateProblem(int problemId, ProblemUpdateRequestDto requestDto) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제가 없습니다. problemId = " + problemId));
        SubChapter subChapter = subChapterRepository.findById(requestDto.getSubChapterId())
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + requestDto.getSubChapterId()));
        problem.update(subChapter, requestDto);
        return problem.getProblemNumber() + "번 문제가 수정되었습니다.";
    }

    @Transactional
    public List<ProblemResponseDto> getProblemList(int subChapterId) {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + subChapterId));
        List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
        List<ProblemResponseDto> responseDtoList = new ArrayList<>();
        for(Problem problem : problemList){
            responseDtoList.add(ProblemResponseDto.builder()
                    .problemId(problem.getProblemId())
                    .subChapterId(subChapterId)
                    .title(problem.getTitle())
                    .content(problem.getContent())
                    .solution(problem.getSolution())
                    .image(problem.getImage())
                    .problemNumber(problem.getProblemNumber())
                    .answer(problem.getAnswer())
                    .isOptional(problem.getIsOptional())
                    .option1(problem.getOption1())
                    .option2(problem.getOption2())
                    .option3(problem.getOption3())
                    .option4(problem.getOption4())
                    .option5(problem.getOption5())
                    .build());
        }
        return responseDtoList;
    }
}
