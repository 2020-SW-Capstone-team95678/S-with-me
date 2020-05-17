package com.swithme.domain.myBook;

import com.swithme.domain.folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface MyBookRepository extends JpaRepository<MyBook, Integer> {
    List<MyBook> findByFolder(Folder folder);
}
