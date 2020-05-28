package com.swithme.domain.curriculum;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.student.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "curriculum")
public class Curriculum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "curriculumId")
    private int curriculumId;

    @ManyToOne
    @JoinColumn(name = "myBookId")
    private MyBook myBook;

    @Column(name = "type")
    private String type;

    @Column(name = "goalNumber")
    private int goalNumber;

    @Builder
    public Curriculum(MyBook myBook, String type, int goalNumber) {
        this.myBook = myBook;
        this.type = type;
        this.goalNumber = goalNumber;
    }
}
