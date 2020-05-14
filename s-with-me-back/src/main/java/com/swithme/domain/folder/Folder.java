package com.swithme.domain.folder;

import com.swithme.domain.student.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity(name = "folder")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folderId")
    private int folderId;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @Column(name = "folderName")
    private String folderName;

    @Builder
    public Folder(Student student, String folderName){
        this.student = student;
        this.folderName = folderName;
    }
}
