package com.swithme.domain.chapter;

import com.swithme.domain.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface ChapterRepository extends JpaRepository<Chapter, Integer> {
    List<Chapter> findByBook(Book book);
}
