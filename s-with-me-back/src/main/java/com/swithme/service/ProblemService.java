package com.swithme.service;

import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.ProblemCreateDto;
import com.swithme.web.dto.ProblemResponseDto;
import com.swithme.web.dto.ProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.hibernate.engine.jdbc.ClobProxy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        try{ content = problem.getContent().getCharacterStream().toString(); }
        catch (NullPointerException nullPointerException){ content = null; }

        try{ solution = problem.getSolution().getCharacterStream().toString(); }
        catch (NullPointerException nullPointerException){ solution = null; }

        try{ image = problem.getImage().getCharacterStream().toString(); }
        catch (NullPointerException nullPointerException){ image = null; }

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
        List<ProblemResponseDto> responseDtoList = new ArrayList<>();

        String content;
        String solution;
        String image;

        for(Problem problem : problemList){
            try{ content = problem.getContent().getCharacterStream().toString(); }
            catch (NullPointerException nullPointerException){ content = null; }

            try{ solution = problem.getSolution().getCharacterStream().toString(); }
            catch (NullPointerException nullPointerException){ solution = null; }

            try{ image = problem.getImage().getCharacterStream().toString(); }
            catch (NullPointerException nullPointerException){ image = null; }

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
                    .build());
        }
        return responseDtoList;
    }
}
