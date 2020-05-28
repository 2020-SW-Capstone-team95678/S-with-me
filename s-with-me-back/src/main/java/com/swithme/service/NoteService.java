package com.swithme.service;

import com.swithme.domain.folder.Folder;
import com.swithme.domain.folder.FolderRepository;
import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.myBook.MyBookRepository;
import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.myProblem.MyProblemRepository;
import com.swithme.domain.note.Note;
import com.swithme.domain.note.NoteRepository;
import com.swithme.domain.problem.Problem;
import com.swithme.domain.problem.ProblemRepository;
import com.swithme.domain.student.Student;
import com.swithme.domain.student.StudentRepository;
import com.swithme.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NoteService{

    private final NoteRepository noteRepository;
    private final StudentRepository studentRepository;
    private final MyProblemRepository myProblemRepository;
    private final FolderRepository folderRepository;
    private final MyBookRepository myBookRepository;

    @Transactional
    public String createNote(NoteCreateDto createDto) {
        MyProblem myProblem = myProblemRepository.findById(createDto.getMyProblemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 my problem이 없습니다. myProblemId = " + createDto.getMyProblemId()));
        Student student = myProblem.getMyBook().getFolder().getStudent();

        long addedDateTime = createDto.getAddedDateTime();
        noteRepository.save(Note.builder()
                .student(student)
                .myProblem(myProblem)
                .addedDateTime(addedDateTime)
                .build());
        return myProblem.getProblem().getProblemNumber() + "번 문제가 오답노트에 추가되었습니다.";
    }

    @Transactional
    public List<NoteResponseDto> getNoteList(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));
        List<Note> noteList = noteRepository.findByStudent(student);
        Collections.sort(noteList);
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
                    .isConfused(myProblem.getIsConfused())
                    .isRight(myProblem.getIsRight())
                    .isSolved(myProblem.getIsSolved())
                    .solvedDateTime(myProblem.getSolvedDateTime())
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
        return myProblem.getProblem().getProblemNumber() + "번 문제가 오답노트에서 삭제되었습니다.";
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
        return myProblem.getProblem().getProblemNumber() + "번 문제가 오답노트에서 수정되었습니다.";
    }

    @Transactional
    public List<NoteResponseDto> getNoteListFilteredByFolder(int studentId, int folderId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException(""));
        List<Note> noteList = noteRepository.findByStudent(student);
        Collections.sort(noteList);
        List<NoteResponseDto> responseDtoList = new ArrayList<>();
        for(Note note: noteList){
            if(note.getMyProblem().getMyBook().getFolder().getFolderId() == folderId){
                MyProblem myProblem = note.getMyProblem();
                responseDtoList.add(NoteResponseDto.builder()
                        .noteId(note.getNoteId())
                        .myProblemId(myProblem.getMyProblemId())
                        .myBookId(myProblem.getMyBook().getMyBookId())
                        .problemId(myProblem.getProblem().getProblemId())
                        .mySolution(myProblem.getMySolution())
                        .myAnswer(myProblem.getMyAnswer())
                        .isConfused(myProblem.getIsConfused())
                        .isRight(myProblem.getIsRight())
                        .isSolved(myProblem.getIsSolved())
                        .solvedDateTime(myProblem.getSolvedDateTime())
                        .build());
            }
        }
        return responseDtoList;
    }

    @Transactional
    public List<NoteResponseDto> getNoteListFilteredBySubject(int studentId, String subject) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생이 없습니다. studentId = " + studentId));
        List<Note> noteList =  noteRepository.findByStudent(student);
        Collections.sort(noteList);
        List<NoteResponseDto> responseDtoList = new ArrayList<>();
        for(Note note: noteList){
            if(note.getMyProblem().getMyBook().getBook().getSubject() == subject) {
                MyProblem myProblem = note.getMyProblem();
                responseDtoList.add(NoteResponseDto.builder()
                        .noteId(note.getNoteId())
                        .myProblemId(myProblem.getMyProblemId())
                        .myBookId(myProblem.getMyBook().getMyBookId())
                        .problemId(myProblem.getProblem().getProblemId())
                        .mySolution(myProblem.getMySolution())
                        .myAnswer(myProblem.getMyAnswer())
                        .isConfused(myProblem.getIsConfused())
                        .isRight(myProblem.getIsRight())
                        .isSolved(myProblem.getIsSolved())
                        .solvedDateTime(myProblem.getSolvedDateTime())
                        .build());
            }
        }
        return responseDtoList;
    }
}
