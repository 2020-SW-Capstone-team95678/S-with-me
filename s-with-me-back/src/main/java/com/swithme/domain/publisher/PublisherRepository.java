package com.swithme.domain.publisher;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PublisherRepository extends JpaRepository<Publisher, Integer>{
    Publisher findByUserId(String userId);
}
