package com.swithme.domain.note;

import com.swithme.domain.myProblem.MyProblem;
import com.swithme.domain.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface NoteRepository extends JpaRepository <Note, Integer>{
    List<Note> findByStudent(Student student);
    Note findByMyProblem(MyProblem myProblem);
}
