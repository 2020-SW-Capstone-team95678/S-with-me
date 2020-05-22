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
    public int updateMyProblem(int myProblemId, MyProblemUpdateRequestDto requestDto) {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemID=" + myProblemId));
        myProblem.update(requestDto);
//        if(!myProblem.isRight() || myProblem.isConfused())
//            noteRepository.save(Note.builder()
//                    .student(myProblem.getMyBook().getFolder().getStudent())
//                    .myProblem(myProblem)
//                    .build());
        return myProblemId;
    }

    public List<MyProblemResponseDto> getMyProblemList(int myBookId, int pageNumber) {
        MyBook myBook = myBookRepository.findById(myBookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my book이 없습니다. myBookId = " + myBookId));
        List<MyProblem> myProblemList = myProblemRepository.findByMyBook(myBook);
        List<MyProblemResponseDto> responseDtoList = new ArrayList<>();
        for(MyProblem myProblem : myProblemList){
            if(myProblem.getProblem().getPageNumber() == pageNumber)
                responseDtoList.add(new MyProblemResponseDto().builder()
                        .myProblemId(myProblem.getMyProblemId())
                        .myBookId(myBookId)
                        .problemId(myProblem.getProblem().getProblemId())
                        .mySolution(myProblem.getMySolution())
                        .myAnswer(myProblem.getMyAnswer())
                        .isConfused(myProblem.isConfused())
                        .isRight(myProblem.isRight())
                        .isSolved(myProblem.isSolved())
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
