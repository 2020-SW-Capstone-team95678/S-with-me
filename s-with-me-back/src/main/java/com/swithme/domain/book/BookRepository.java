package com.swithme.domain.book;

import com.swithme.domain.publisher.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByPublisher(Publisher publisher);
}
