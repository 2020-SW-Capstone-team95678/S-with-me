package com.swithme.service;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final SubChapterRepository subChapterRepository;

    @Transactional
    public ProblemResponseDto findById(int problemId) throws SQLException {
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
                .isMath(problem.getIsMath())
                .build();

        return responseDto;
    }

    @Transactional
    public int createProblem(ProblemCreateDto createDto) {
        SubChapter subChapter = subChapterRepository.findById(createDto.getSubChapterId())
                .orElseThrow(() -> new IllegalArgumentException
                        ("해당 sub chapter가 없습니다. subChapterId = " + createDto.getSubChapterId()));

        if(problemRepository.findBySubChapter(subChapter).isEmpty()){
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
                    .isMath(createDto.getIsMath())
                    .beforeProblemId(0)
                    .build());
        }
        else{
            List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
            int last = problemList.size() - 1;
            Problem lastProblem = problemList.get(last);
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
                    .isMath(createDto.getIsMath())
                    .beforeProblemId(lastProblem.getProblemId())
                    .build());
        }

        int last = problemRepository.findBySubChapter(subChapter).size() - 1;

        return problemRepository.findBySubChapter(subChapter).get(last).getProblemId();
    }

    @Transactional
    public String updateProblem(int problemId, ProblemUpdateRequestDto requestDto) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제가 없습니다. problemId = " + problemId));

        SubChapter subChapter = subChapterRepository.findById(requestDto.getSubChapterId())
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + requestDto.getSubChapterId()));

        problem.update(subChapter, requestDto);

        return "[" + problem.getProblemNumber() + "]" + "번 문제가 수정되었습니다.";
    }

    @Transactional
    public List<ProblemResponseDto> getProblemList(int subChapterId) throws SQLException {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + subChapterId));

        List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
        if(problemList.size() > 1) Collections.sort(problemList);

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
                    .isMath(problem.getIsMath())
                    .build());
        }

        return responseDtoList;
    }

    @Transactional
    public List<AnswerResponseDto> getAnswerList(int lastSubChapterId, short lastPageNumber) {
        SubChapter subChapter = subChapterRepository.findById(lastSubChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 subChapter가 없습니다. subChapterId = " + lastPageNumber));
        List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
        if(problemList.size() > 1) Collections.sort(problemList);

        List<Problem> problemListInPage = Problem.paginate(problemList, lastPageNumber);

        List<AnswerResponseDto> responseDtoList = new ArrayList<>();
        for (Problem problem : problemListInPage) {
            responseDtoList.add(AnswerResponseDto.builder()
                    .problemId(problem.getProblemId())
                    .answer(problem.getAnswer())
                    .build());
        }

        return responseDtoList;
    }

    @Transactional
    public String deleteProblem(int problemId) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제가 없습니다. problemId = " + problemId));
        short problemNumber = problem.getProblemNumber();
        SubChapter subChapter = problem.getSubChapter();

        Problem beforeProblem = null;
        if(problem.getBeforeProblemId() != 0) {
            beforeProblem = problemRepository.findById(problem.getBeforeProblemId())
                    .orElseThrow(() -> new IllegalArgumentException("이전 소단원이 없습니다."));
        }
        Problem afterProblem = problemRepository.findByBeforeProblemId(problemId);

        problemRepository.delete(problem);

        if(!problemRepository.findBySubChapter(subChapter).isEmpty()) {
            //가장 앞을 삭제한 경우
            if(beforeProblem == null)
                afterProblem.update(0);
                //가장 뒤를 삭제한 경우
            else if(afterProblem == null);
                //나머지 경우
            else
                afterProblem.update(beforeProblem.getProblemId());
        }

        return "[" + problemNumber + "]" + "번 문제가 삭제되었습니다.";
    }
}
