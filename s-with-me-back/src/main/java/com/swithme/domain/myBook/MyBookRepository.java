package com.swithme.domain.myBook;

import com.swithme.domain.folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MyBookRepository extends JpaRepository<MyBook, Integer> {
    MyBook findByFolder(Folder folder);
}
