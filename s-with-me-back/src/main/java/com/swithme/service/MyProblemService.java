package com.swithme.service;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.web.dto.MyProblemResponseDto;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class MyProblemService {

    private final MyProblemRepository myProblemRepository;
    private final NoteRepository noteRepository;
    private final MyBookRepository myBookRepository;

    @Transactional
    public String updateMyProblem(int myProblemId, MyProblemUpdateRequestDto requestDto) {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemID=" + myProblemId));
        myProblem.update(requestDto);
        if(!myProblem.getIsRight() || myProblem.getIsConfused()) {
            if (noteRepository.findByMyProblem(myProblem) == null) {
                noteRepository.save(Note.builder()
                        .student(myProblem.getMyBook().getFolder().getStudent())
                        .myProblem(myProblem)
                        .addedDateTime(myProblem.getSolvedDateTime())
                        .build());
                return myProblem.getProblem().getProblemNumber() + "번 문제가 오답노트에 추가되었습니다.";
            } else {
                Note note = noteRepository.findByMyProblem(myProblem);
                note.update(myProblem.getSolvedDateTime());
            }
        }

        return "최근 나의 풀이가 저장되었습니다.";
    }

    @Transactional
    public List<MyProblemResponseDto> getMyProblemList(int myBookId) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId = " + myBookId));
        List<MyProblem> myProblemList = myProblemRepository.findByMyBook(myBook);
        List<MyProblemResponseDto> responseDtoList = new ArrayList<>();
        for(MyProblem myProblem : myProblemList){
            responseDtoList.add(new MyProblemResponseDto().builder()
                    .myProblemId(myProblem.getMyProblemId())
                    .myBookId(myBookId)
                    .problemId(myProblem.getProblem().getProblemId())
                    .mySolution(myProblem.getMySolution())
                    .myAnswer(myProblem.getMyAnswer())
                    .isConfused(myProblem.getIsConfused())
                    .isRight(myProblem.getIsRight())
                    .isSolved(myProblem.getIsSolved())
                    .solvedDateTime(myProblem.getSolvedDateTime())
                    .build());
        }
        return responseDtoList;
    }

//    @Transactional
//    public int updateMyProblem(MyProblemUpdateRequestDto requestDto){
//        List<MyProblem> myProblemToUpdateList = requestDto.getMyProblemList();
//        for(MyProblem myProblemToUpdate : myProblemToUpdateList){
//            MyProblem myProblem = myProblemRepository.findById(myProblemToUpdate.getMyProblemId())
//                    .orElseThrow(() -> new IllegalArgumentException
//                            ("해당 my problem이 없습니다. myProblemId=" + myProblemToUpdate.getMyProblemId()));
//            myProblem.update(myProblemToUpdate);
//        }
//        return 1;
//    }
}
