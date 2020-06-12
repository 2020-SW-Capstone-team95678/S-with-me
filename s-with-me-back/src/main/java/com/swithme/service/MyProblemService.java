package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.mainChapter.MainChapter;
import com.swithme.domain.mainChapter.MainChapterRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.MySolutionResponseDto;
import com.swithme.web.dto.MyProblemResponseDto;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import com.swithme.web.dto.ProblemResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class MyProblemService {

    private final MyProblemRepository myProblemRepository;
    private final NoteRepository noteRepository;
    private final MyBookRepository myBookRepository;
    private final MainChapterRepository mainChapterRepository;
    private final SubChapterRepository subChapterRepository;
    private final ProblemRepository problemRepository;

    @Transactional
    public String updateMyProblem(int myProblemId, MyProblemUpdateRequestDto requestDto) {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemID=" + myProblemId));

        myProblem.update(requestDto);

        if (!myProblem.getIsRight() || myProblem.getIsConfused()) {
            if (noteRepository.findByMyProblem(myProblem) == null) {
                noteRepository.save(Note.builder()
                        .student(myProblem.getMyBook().getFolder().getStudent())
                        .myProblem(myProblem)
                        .addedDateTime(myProblem.getSolvedDateTime())
                        .build());

                return "[" + myProblem.getProblem().getProblemNumber()+ "]" + "번 문제가 오답노트에 추가되었습니다.";
            } else {
                Note note = noteRepository.findByMyProblem(myProblem);
                note.update(myProblem.getSolvedDateTime());
            }
        }

        return "최근 나의 풀이가 저장되었습니다.";
    }

    @Transactional
    public List<MyProblemResponseDto> getMyProblemList(int myBookId, int lastSubChapterId, short lastPageNumber) throws SQLException {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId =" + myBookId));

        List<MyProblem> allMyProblemList = myProblemRepository.findByMyBook(myBook);
        List<MyProblem> myProblemList = new ArrayList<>();

        for(MyProblem myProblem : allMyProblemList){
            if(myProblem.getProblem().getSubChapter().getSubChapterId() == lastSubChapterId){
                myProblemList.add(myProblem);
            }
        }

        if(myProblemList.size() > 1) Collections.sort(myProblemList);

        List<MyProblem> myProblemListInPage = new ArrayList<>();
        try{
            myProblemListInPage = myProblemList.subList(lastPageNumber * 8 - 8, lastPageNumber * 8);
        } catch(IndexOutOfBoundsException indexOutOfBoundsException){
            //subChapter의 마지막 페이지의 경우 문제가 8문제가 아닐 수도 있음.
            myProblemListInPage = myProblemList.subList(lastPageNumber * 8 - 8, myProblemList.size());
        }

        List<MyProblemResponseDto> responseDtoList = new ArrayList<>();
        for (MyProblem myProblem : myProblemListInPage) {
            responseDtoList.add(new MyProblemResponseDto().builder()
                    .myProblemId(myProblem.getMyProblemId())
                    .myBookId(myProblem.getMyBook().getMyBookId())
                    .problemId(myProblem.getProblem().getProblemId())
                    .linkSolutionId(myProblem.getLinkSolutionId())
                    .imageSolution(myProblem.getImageSolution())
                    .textSolution(myProblem.getTextSolution())
                    .handSolution(myProblem.getHandSolution())
                    .solutionType(myProblem.getSolutionType())
                    .myAnswer(myProblem.getMyAnswer())
                    .isConfused(myProblem.getIsConfused())
                    .isRight(myProblem.getIsRight())
                    .isSolved(myProblem.getIsSolved())
                    .solvedDateTime(myProblem.getSolvedDateTime())
                    .isMath(myProblem.getIsMath())
                    .build());
        }

        return responseDtoList;
    }

    @Transactional
    public List<MyProblemResponseDto> getMyProblemListInSubChapter(int myBookId, int subChapterId) throws SQLException{
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId = " + myBookId));

        List<MyProblem> allMyProblemList = myProblemRepository.findByMyBook(myBook);

        List<MyProblem> myProblemList = new ArrayList<>();
        for(MyProblem myProblem : allMyProblemList){
            if(myProblem.getProblem().getSubChapter().getSubChapterId() == subChapterId)
                myProblemList.add(myProblem);
        }

        if(myProblemList.size() > 1) Collections.sort(myProblemList);

        List<MyProblemResponseDto> responseDtoList = new ArrayList<>();
        for (MyProblem myProblem : myProblemList) {
            responseDtoList.add(new MyProblemResponseDto().builder()
                    .myProblemId(myProblem.getMyProblemId())
                    .myBookId(myProblem.getMyBook().getMyBookId())
                    .problemId(myProblem.getProblem().getProblemId())
                    .linkSolutionId(myProblem.getLinkSolutionId())
                    .imageSolution(myProblem.getImageSolution())
                    .textSolution(myProblem.getTextSolution())
                    .handSolution(myProblem.getHandSolution())
                    .solutionType(myProblem.getSolutionType())
                    .myAnswer(myProblem.getMyAnswer())
                    .isConfused(myProblem.getIsConfused())
                    .isRight(myProblem.getIsRight())
                    .isSolved(myProblem.getIsSolved())
                    .solvedDateTime(myProblem.getSolvedDateTime())
                    .isMath(myProblem.getIsMath())
                    .build());
        }

        return responseDtoList;
    }


    @Transactional
    public MySolutionResponseDto getMySolution(int myProblemId) throws SQLException {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myProblem이 없습니다. myProblemId = " + myProblemId));
        Problem problem = myProblem.getProblem();
        SubChapter subChapter = problem.getSubChapter();

        ProblemResponseDto problemResponseDto = ProblemResponseDto.builder().build().builder()
                .problemId(problem.getProblemId())
                .subChapterId(subChapter.getSubChapterId())
                .title(problem.getTitle())
                .content(problem.getContent())
                .solution(problem.getSolution())
                .image(problem.getImage())
                .answer(problem.getAnswer())
                .problemNumber(problem.getProblemNumber())
                .isOptional(problem.getIsOptional())
                .option1(problem.getOption1())
                .option2(problem.getOption2())
                .option3(problem.getOption3())
                .option4(problem.getOption4())
                .option5(problem.getOption5())
                .isMath(problem.getIsMath())
                .build();

        MySolutionResponseDto responseDto = MySolutionResponseDto.builder()
                .problem(problemResponseDto)
                .linkSolutionId(myProblem.getLinkSolutionId())
                .textSolution(myProblem.getTextSolution())
                .imageSolution(myProblem.getImageSolution())
                .handSolution(myProblem.getHandSolution())
                .solutionType(myProblem.getSolutionType())
                .myAnswer(myProblem.getMyAnswer())
                .build();

        return responseDto;
    }

    @Transactional
    public String createMyProblems(int createdMyBookId){
        MyBook myBook = myBookRepository.findById(createdMyBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 myBook이 없습니다. myBookId = " + createdMyBookId));
        Book book = myBook.getBook();

        List<MainChapter> mainChapterList = mainChapterRepository.findByBook(book);
        for(MainChapter mainChapter : mainChapterList){
            List<SubChapter> subChapterList = subChapterRepository.findByMainChapter(mainChapter);
            for(SubChapter subChapter : subChapterList){
                List<Problem> problemList = problemRepository.findBySubChapter(subChapter);
                for(Problem problem : problemList){
                    myProblemRepository.save(MyProblem.builder()
                            .problem(problem)
                            .myBook(myBook)
                            .myAnswer(null)
                            .solutionType(null)
                            .linkSolutionId(null)
                            .textSolution(null)
                            .imageSolution(null)
                            .handSolution(null)
                            .isConfused(false)
                            .isRight(false)
                            .isSolved(false)
                            .solvedDateTime(0L)
                            .isMath(problem.getIsMath())
                            .build());
                }
            }
        }

        return "[" + book.getName() + "] 문제집이 구매되었습니다.";
    }
}