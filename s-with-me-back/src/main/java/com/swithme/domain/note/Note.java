package com.swithme.domain.note;

import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.student.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Getter
@NoArgsConstructor
@Entity(name = "note")
public class Note implements Comparable<Note>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noteId")
    private int noteId;

    @OneToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @OneToOne
    @JoinColumn(name = "myProblemId")
    private MyProblem myProblem;

    @Column(name = "addedDateTime")
    private Long addedDateTime;

    @Builder
    public Note(Student student, MyProblem myProblem, Long addedDateTime){
        this.student = student;
        this.myProblem = myProblem;
        this.addedDateTime = addedDateTime;
    }

    @Override
    public int compareTo(Note note){
        return note.getAddedDateTime().compareTo(this.addedDateTime);
    }

    public void update(long addedDateTime) {
        this.addedDateTime = addedDateTime;
    }

    public static List<Note> paginate(List<Note> noteList, short page){
        List<Note> noteListInPage;
        try{
            noteListInPage = noteList.subList(page * 8 - 8, page * 8);
        } catch(IndexOutOfBoundsException indexOutOfBoundsException){
            //subChapter의 마지막 페이지의 경우 문제가 8문제가 아닐 수도 있음.
            noteListInPage = noteList.subList(page * 8 - 8, noteList.size());
        }
        return noteListInPage;
    }
}
