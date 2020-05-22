package com.swithme.service;

import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final StudentRepository studentRepository;
    private final MyProblemRepository myProblemRepository;

    @Transactional
    public String saveNote(NoteSaveRequestDto requestDto) {
        MyProblem myProblem = myProblemRepository.findById(requestDto.getMyProblemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemId = " + requestDto.getMyProblemId()));
        Student student = myProblem.getMyBook().getFolder().getStudent();

        long addedDateTime = requestDto.getAddedDateTime();
        noteRepository.save(Note.builder()
                .student(student)
                .myProblem(myProblem)
                .addedDateTime(addedDateTime)
                .build());
        return "오답노트에 문제가 추가되었습니다.";
    }

    @Transactional
    public List<NoteResponseDto> getNoteList(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));
        List<Note> noteList = noteRepository.findByStudent(student);
        Note.sort(noteList);
        List<NoteResponseDto> responseDtoList = new ArrayList<>();
        for(Note note : noteList){
            MyProblem myProblem = note.getMyProblem();
            responseDtoList.add(new NoteResponseDto().builder()
                    .noteId(note.getNoteId())
                    .myProblemId(myProblem.getMyProblemId())
                    .myBookId(myProblem.getMyBook().getMyBookId())
                    .problemId(myProblem.getProblem().getProblemId())
                    .mySolution(myProblem.getMySolution())
                    .myAnswer(myProblem.getMyAnswer())
                    .isConfused(myProblem.isConfused())
                    .isRight(myProblem.isRight())
                    .solvedDateTime(myProblem.getSolvedDateTime())
                    .build());
        }
        return responseDtoList;
    }

    @Transactional
    public String deleteNote(int noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new IllegalArgumentException("해당 note가 없습니다. noteId = " + noteId));
        noteRepository.delete(note);
        return "오답노트가 삭제되었습니다.";
    }

    @Transactional
    public String updateNote(int noteId, NoteUpdateRequestDto requestDto) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new IllegalArgumentException("해당 note가 없습니다. noteId = " + noteId));
        MyProblem myProblem = myProblemRepository.findById(note.getMyProblem().getMyProblemId())
                .orElseThrow(() -> new IllegalArgumentException
                        ("해당 my problem이 없습니다. myProblemID=" + note.getMyProblem().getMyProblemId()));

        note.update(requestDto.getAddedDateTime());
        myProblem.update(requestDto.getMyProblemUpdateRequestDto());
        return "오답노트가 수정되었습니다.";
    }
}
