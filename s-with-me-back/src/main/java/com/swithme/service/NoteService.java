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

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NoteService{

    private final NoteRepository noteRepository;
    private final StudentRepository studentRepository;
    private final MyProblemRepository myProblemRepository;

    @Transactional
    public String createNote(NoteCreateDto createDto) {
        MyProblem myProblem = myProblemRepository.findById(createDto.getMyProblemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemId = " + createDto.getMyProblemId()));

        if(noteRepository.findByMyProblem(myProblem) == null) {
            Student student = myProblem.getMyBook().getFolder().getStudent();
            long addedDateTime = createDto.getAddedDateTime();

            noteRepository.save(Note.builder()
                    .student(student)
                    .myProblem(myProblem)
                    .addedDateTime(addedDateTime)
                    .build());

            return "[" + myProblem.getProblem().getProblemNumber() + "]" + "번 문제가 오답노트에 추가되었습니다.";
        }
        else return "이미 오답노트에 있는 문제입니다.";
    }

    @Transactional
    public List<NoteResponseDto> getNoteList(int studentId, short page) throws SQLException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));

        List<Note> noteList = noteRepository.findByStudent(student);
        if(noteList.size() > 1) Collections.sort(noteList);

        List<Note> noteListInPage = Note.paginate(noteList, page);

        List<NoteResponseDto> responseDtoList = new ArrayList<>();
        for(Note note : noteListInPage){
            MyProblem myProblem = note.getMyProblem();

            responseDtoList.add(new NoteResponseDto().builder()
                    .noteId(note.getNoteId())
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
    public String deleteNote(int myProblemId) {
        MyProblem myProblem = myProblemRepository.findById(myProblemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemId = " + myProblemId));
        Note note = noteRepository.findByMyProblem(myProblem);

        noteRepository.delete(note);

        return "[" + myProblem.getProblem().getProblemNumber() + "]" + "번 문제가 오답노트에서 삭제되었습니다.";
    }

    @Transactional
    public String updateNote(int noteId, NoteUpdateRequestDto requestDto) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new IllegalArgumentException("해당 note가 없습니다. noteId = " + noteId));

        MyProblem myProblem = myProblemRepository.findById(note.getMyProblem().getMyProblemId())
                .orElseThrow(() -> new IllegalArgumentException
                        ("해당 my problem이 없습니다. myProblemID=" + note.getMyProblem().getMyProblemId()));

        note.update(requestDto.getSolvedDateTime());
        myProblem.update(requestDto);

        return "[" + myProblem.getProblem().getProblemNumber() + "]" + "번 문제가 오답노트에서 수정되었습니다.";
    }

    @Transactional
    public List<NoteResponseDto> getNoteListFilteredByFolder(int studentId, int folderId, short page) throws SQLException{
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException(""));

        List<Note> noteList = noteRepository.findByStudent(student);
        if(noteList.size() > 1) Collections.sort(noteList);

        List<Note> noteListFilteredByFolder = new ArrayList<>();
        for(Note note: noteList){
            if(note.getMyProblem().getMyBook().getFolder().getFolderId() == folderId)
                noteListFilteredByFolder.add(note);
        }

        List<Note> noteListInPage = Note.paginate(noteListFilteredByFolder, page);

        List<NoteResponseDto> responseDtoList = new ArrayList<>();
        for(Note note: noteListInPage){
            MyProblem myProblem = note.getMyProblem();

            responseDtoList.add(NoteResponseDto.builder()
                    .noteId(note.getNoteId())
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
    public List<NoteResponseDto> getNoteListFilteredBySubject(int studentId, String subject, short page) throws SQLException{
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));

        List<Note> noteList =  noteRepository.findByStudent(student);
        if(noteList.size() > 1) Collections.sort(noteList);

        List<Note> noteListFilteredBySubject=  new ArrayList<>();
        for(Note note: noteList){
            if(note.getMyProblem().getMyBook().getBook().getSubject().equals(subject))
                noteListFilteredBySubject.add(note);
        }

        List<Note> noteListInPage = Note.paginate(noteListFilteredBySubject, page);

        List<NoteResponseDto> responseDtoList = new ArrayList<>();
        for(Note note: noteListInPage){
            MyProblem myProblem = note.getMyProblem();

            responseDtoList.add(NoteResponseDto.builder()
                    .noteId(note.getNoteId())
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
                    .build());
        }

        return responseDtoList;
    }
}
