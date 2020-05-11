package com.swithme.domain.publisher;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PublisherRepositoryTest {

    @Autowired
    private PublisherRepository publisherRepository;

    @After
    public void cleanup(){
        publisherRepository.deleteAll();
    }

    @Test
    public void saveLoadPublisher(){
        String id = "test id";
        String password = "test password";
        String name = "test name";
        String code = "test code";

        publisherRepository.save(Publisher.builder()
                .id(id)
                .password(password)
                .name(name)
                .code(code)
                .build());

        List<Publisher> publisherList = publisherRepository.findAll();
        Publisher publisher = publisherList.get(0);

        assertThat(publisher.getId()).isEqualTo(id);
        assertThat(publisher.getPassword()).isEqualTo(password);
        assertThat(publisher.getName()).isEqualTo(name);
        assertThat(publisher.getCode()).isEqualTo(code);
    }

}
