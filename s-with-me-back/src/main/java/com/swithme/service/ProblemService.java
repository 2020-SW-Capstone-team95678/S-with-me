package com.swithme.service;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Clob;
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

        String content;
        String solution;
        String image;

        try{ content = Problem.readClobData(problem.getContent().getCharacterStream()); }
        catch (NullPointerException | IOException exception){ content = null; }

        try{ solution = Problem.readClobData(problem.getSolution().getCharacterStream()); }
        catch (NullPointerException | IOException exception){ solution = null; }

        try{ image = Problem.readClobData(problem.getImage().getCharacterStream()); }
        catch (NullPointerException | IOException exception){ image = null; }

        ProblemResponseDto responseDto =  ProblemResponseDto.builder()
                .problemId(problem.getProblemId())
                .subChapterId(problem.getSubChapter().getSubChapterId())
                .title(problem.getTitle())
                .content(content)
                .solution(solution)
                .image(image)
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
    public String createProblems(List<ProblemCreateDto> createDtoList) {
        Clob content;
        Clob solution;
        Clob image;

        for (ProblemCreateDto createDto : createDtoList) {
            SubChapter subChapter = subChapterRepository.findById(createDto.getSubChapterId())
                    .orElseThrow(() -> new IllegalArgumentException
                            ("해당 sub chapter가 없습니다. subChapterId = " + createDto.getSubChapterId()));

            try{ content = ClobProxy.generateProxy(createDto.getContent()); }
            catch (NullPointerException nullPointerException){ content = null; }

            try{ solution = ClobProxy.generateProxy(createDto.getSolution()); }
            catch (NullPointerException nullPointerException){ solution = null; }

            try{ image = ClobProxy.generateProxy(createDto.getImage()); }
            catch (NullPointerException nullPointerException){ image = null; }

            problemRepository.save(Problem.builder()
                    .subChapter(subChapter)
                    .title(createDto.getTitle())
                    .content(content)
                    .solution(solution)
                    .answer(createDto.getAnswer())
                    .image(image)
                    .problemNumber(createDto.getProblemNumber())
                    .isOptional(createDto.getIsOptional())
                    .option1(createDto.getOption1())
                    .option2(createDto.getOption2())
                    .option3(createDto.getOption3())
                    .option4(createDto.getOption4())
                    .option5(createDto.getOption5())
                    .isMath(createDto.getIsMath())
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
    public List<ProblemResponseDto> getProblemList(int subChapterId) throws SQLException {
        SubChapter subChapter = subChapterRepository.findById(subChapterId)
                .orElseThrow(() -> new IllegalArgumentException("해당 소단원이 없습니다. subChapterId = " + subChapterId));

        List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
        Collections.sort(problemList);
        List<ProblemResponseDto> responseDtoList = new ArrayList<>();

        String content;
        String solution;
        String image;

        for(Problem problem : problemList){
            try{ content = Problem.readClobData(problem.getContent().getCharacterStream()); }
            catch (NullPointerException | IOException exception){ content = null; }

            try{ solution = Problem.readClobData(problem.getSolution().getCharacterStream()); }
            catch (NullPointerException | IOException exception){ solution = null; }

            try{ image = Problem.readClobData(problem.getImage().getCharacterStream()); }
            catch (NullPointerException | IOException exception){ image = null; }

            responseDtoList.add(ProblemResponseDto.builder()
                    .problemId(problem.getProblemId())
                    .subChapterId(subChapterId)
                    .title(problem.getTitle())
                    .content(content)
                    .solution(solution)
                    .image(image)
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
        Collections.sort(problemList);

        List<Problem> problemListInPage = new ArrayList<>();
        try{
            problemListInPage = problemList.subList(lastPageNumber * 8 - 8, lastPageNumber * 8);
        } catch(IndexOutOfBoundsException indexOutOfBoundsException){
            //subChapter의 마지막 페이지의 경우 문제가 8문제가 아닐 수도 있음.
            problemListInPage = problemList.subList(lastPageNumber * 8 - 8, problemList.size());
        }

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

        Problem beforeProblem = null;
        if(problem.getBeforeProblemId() != 0) {
            beforeProblem = problemRepository.findById(problem.getBeforeProblemId())
                    .orElseThrow(() -> new IllegalArgumentException("이전 소단원이 없습니다."));
        }
        Problem afterProblem = problemRepository.findByBeforeProblemId(problemId);

        problemRepository.delete(problem);

        if(!problemRepository.findAll().isEmpty()) {
            //가장 앞을 삭제한 경우
            if(beforeProblem == null)
                afterProblem.update(0);
                //가장 뒤를 삭제한 경우
            else if(afterProblem == null);
                //나머지 경우
            else
                afterProblem.update(beforeProblem.getProblemId());
        }

        return problemNumber + "번 문제가 삭제되었습니다.";
    }
}
