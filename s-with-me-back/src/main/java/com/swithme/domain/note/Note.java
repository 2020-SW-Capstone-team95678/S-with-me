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
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noteId")
    private int noteId;

    @OneToOne
    private Student student;

    @OneToOne
    private MyProblem myProblem;

    @Column(name = "addedDateTime")
    private Long addedDateTime;

    @Builder
    public Note(Student student, MyProblem myProblem, Long addedDateTime){
        this.student = student;
        this.myProblem = myProblem;
        this.addedDateTime = addedDateTime;
    }

    public static void sort(List<Note> noteList){
        Collections.sort(noteList, new Comparator<Note>() {
            @Override
            public int compare(Note note, Note targetNote) {
                return note.addedDateTime.compareTo(targetNote.addedDateTime);
            }
        });
    }

}
