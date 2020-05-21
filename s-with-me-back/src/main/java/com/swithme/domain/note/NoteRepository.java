package com.swithme.domain.note;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository <Note, Integer>{
}
