package com.swithme.service;

import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.student.Student;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MyProblemService {

    private final MyProblemRepository myProblemRepository;
    private final NoteRepository noteRepository;

    @Transactional
    public int updateMyProblem(int myProblemId, MyProblemUpdateRequestDto requestDto) {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemID=" + myProblemId));
        myProblem.update(requestDto);
        if(!myProblem.isRight() || myProblem.isConfused())
            noteRepository.save(Note.builder()
                    .student(myProblem.getMyBook().getFolder().getStudent())
                    .myProblem(myProblem)
                    .build());
        return myProblemId;
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
