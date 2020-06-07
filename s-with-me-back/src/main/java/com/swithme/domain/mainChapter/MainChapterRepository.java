package com.swithme.domain.mainChapter;

import com.swithme.domain.book.Book;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MainChapterRepository extends JpaRepository<MainChapter, Integer> {
    List<MainChapter> findByBook(Book book);
    MainChapter findByBeforeMainChapterId(Integer beforeMainChapterId);
}
