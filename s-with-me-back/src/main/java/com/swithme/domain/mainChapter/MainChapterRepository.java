package com.swithme.domain.mainChapter;

import com.swithme.domain.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MainChapterRepository extends JpaRepository<MainChapter, Integer> {
    List<MainChapter> findByBook(Book book);
}
