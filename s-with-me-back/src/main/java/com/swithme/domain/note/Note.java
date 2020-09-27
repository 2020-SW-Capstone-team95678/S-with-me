package com.swithme.domain.note;

import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.student.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(name = "addedDate")
    private Long addedDate;

    @Builder
    public Note(Student student, MyProblem myProblem, Long addedDate){
        this.student = student;
        this.myProblem = myProblem;
        this.addedDate = addedDate;
    }

}
