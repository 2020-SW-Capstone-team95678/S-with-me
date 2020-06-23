package com.swithme.service;


import com.swithme.domain.curriculum.Curriculum;
import com.swithme.domain.curriculum.CurriculumRepository;
import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.domain.subChapter.SubChapter;
import com.swithme.domain.subChapter.SubChapterRepository;
import com.swithme.web.dto.CurriculumCreateDto;
import com.swithme.web.dto.CurriculumResponseDto;
import com.swithme.web.dto.CurriculumUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CurriculumService {

    private final MyBookRepository myBookRepository;
    private final CurriculumRepository curriculumRepository;
    private final StudentRepository studentRepository;
    private final FolderRepository folderRepository;
    private final MyProblemRepository myProblemRepository;
    private final SubChapterRepository subChapterRepository;
    private final ProblemRepository problemRepository;
    private final long standardMonday=1590332400000L; // 2020-5-25:00:00
    private final long milliSecPerWeek = 1000*60*60*24*7;
    private final long milliSecPerDay = 1000*60*60*24;
    @Transactional
    public int createCurriculum(CurriculumCreateDto curriculumCreateDto){
        MyBook myBook=myBookRepository.findById(curriculumCreateDto.getMyBookId())
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 존재하지 않습니다."));
        Curriculum curriculum = curriculumRepository.findByMyBook(myBook);
        if(curriculum!=null){ throw new IllegalArgumentException("해당 책에 대한 커리큘럼이 이미 존재합니다.");}

        curriculumRepository.save(Curriculum.builder()
                .subChapterId(curriculumCreateDto.getSubChapterId())
                .myBook(myBook)
                .dailyGoal(curriculumCreateDto.getDailyGoal())
                .monthlyGoal(curriculumCreateDto.getMonthlyGoal())
                .type(curriculumCreateDto.getType())
                .build());
        return myBook.getMyBookId();
    }
    @Transactional
    public String deleteCurriculum(int curriculumId)
    {
        Curriculum curriculum = curriculumRepository.findById(curriculumId)
                .orElseThrow(() -> new IllegalArgumentException("해당 커리큘럼이 존재하지 않습니다."));
        curriculumRepository.deleteById(curriculumId);
        return "커리큘럼 삭제 완료";
    }
    @Transactional
    public CurriculumResponseDto getCurriculum(int myBookId)
    {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 존재하지 않습니다."));
        Curriculum curriculum = curriculumRepository.findByMyBook(myBook);
        if(curriculum==null){
            return CurriculumResponseDto.builder().build();
        }
        return CurriculumResponseDto.builder()
                .curriculumId(curriculum.getCurriculumId())
                .myBookId(myBookId)
                .subChapterId(curriculum.getSubChapterId())
                .type(curriculum.getType())
                .dailyGoal(curriculum.getDailyGoal())
                .monthlyGoal(curriculum.getMonthlyGoal())
                .build();
    }
    @Transactional
    public List<CurriculumResponseDto> getCurriculumList(int studentId){
        List<CurriculumResponseDto> curriculumResponseDtoList= new ArrayList<>();
        Student student=studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 존재하지 않습니다."));
        List<Folder> folderList=folderRepository.findByStudent(student);
        List<Curriculum> curriculumList = new ArrayList<>();
        List<MyBook> myBookList = new ArrayList<>();

        for(Folder folder : folderList)
        {
            myBookList.addAll(myBookRepository.findByFolder(folder));
        }
        for(MyBook myBook : myBookList)
        {
            Curriculum curriculum = curriculumRepository.findByMyBook(myBook);
            if(curriculum!=null){curriculumList.add(curriculum);}
        }
        if(curriculumList.size()==0){return curriculumResponseDtoList;}

        for(Curriculum curriculum : curriculumList)
        {
            curriculumResponseDtoList.add(CurriculumResponseDto.builder()
                    .curriculumId(curriculum.getCurriculumId())
                    .subChapterId(curriculum.getSubChapterId())
                    .dailyGoal(curriculum.getDailyGoal())
                    .type(curriculum.getType())
                    .monthlyGoal(curriculum.getMonthlyGoal())
                    .myBookId(curriculum.getMyBook().getMyBookId())
                    .build());
        }
        return curriculumResponseDtoList;
    }

    @Transactional
    public String updateCurriculum(int curriculumId, CurriculumUpdateRequestDto curriculumUpdateRequestDto){
        Curriculum curriculum = curriculumRepository.findById(curriculumId)
                .orElseThrow(() -> new IllegalArgumentException("해당 커리큘럼이 존재하지 않습니다."));
        curriculum.update(curriculumUpdateRequestDto);
        return "수정 완료";
    }

    @Transactional
    public int getAchievement(int myBookId){

        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제집이 존재하지 않습니다."));
        Curriculum curriculum = curriculumRepository.findByMyBook(myBook);
        if(curriculum==null){return -1;}

        if(curriculum.getType().equals("monthly")){return -1;}
        List<MyProblem> myProblemList = myProblemRepository.findByMyBook(myBook);

        int problemArchievement=0;
        long nowTime = System.currentTimeMillis();
        long Start,End;

        if(curriculum.getType().equals("daily")) {
            Start = ((nowTime/milliSecPerDay)*milliSecPerDay);
            End = Start + milliSecPerDay -1;

            for(MyProblem myProblem : myProblemList)
            {
                if (Start < myProblem.getSolvedDateTime() && myProblem.getSolvedDateTime() < End) {
                    problemArchievement++;
                }
            }
            return problemArchievement*100/curriculum.getDailyGoal();
        }
        else {

            SubChapter subChapter = subChapterRepository.findById(curriculum.getSubChapterId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 챕터가 존재하지 않습니다."));
            Start = standardMonday + (((nowTime - standardMonday) / milliSecPerWeek) * milliSecPerWeek);
            End = Start + milliSecPerWeek;
            for(MyProblem myProblem : myProblemList)
            {
                if(myProblem.getProblem().getSubChapter().equals(subChapter)) {
                    if (Start < myProblem.getSolvedDateTime() && myProblem.getSolvedDateTime() < End) {
                        problemArchievement++;
                    }
                }
            }
            List<Problem> problemList = problemRepository.findBySubChapter(
                    subChapterRepository.findById(curriculum.getSubChapterId())
                            .orElseThrow(() -> new IllegalArgumentException("해당 챕터가 존재하지 않습니다.")));
            int subChapterSize = problemList.size();
            return (problemArchievement*100/subChapterSize);
        }
    }
}
