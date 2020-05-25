package com.swithme.domain.folder;

import com.swithme.domain.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
    List<Folder> findByStudent(Student student);
    List<Folder> findByFolderName(String folderName);
}
