package com.swithme.domain.subChapter;

import com.swithme.domain.mainChapter.MainChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SubChapterRepository extends JpaRepository<SubChapter, Integer> {
    List<SubChapter> findByMainChapter(MainChapter mainChapter);
}
