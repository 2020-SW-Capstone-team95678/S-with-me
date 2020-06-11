package com.swithme.service;

import com.swithme.domain.book.Book;
import com.swithme.domain.book.BookRepository;
import org.junit.After;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.CronTask;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.ScheduledMethodRunnable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookServiceTest {

    @Autowired
    private BookRepository bookRepository;

    private static String calledMethodName;

    @After
    public void cleanup(){
        bookRepository.deleteAll();
    }

    /*------------------------------------------------------------------------
        cleanUpMonthlyProfitAndSoldTest 코드 테스트 방법
        1. com.swithme.service.BookService의 cleanUpMonthlyProfitAndSold메소드의
           cron = "0 0 0 1 * *" 을 cron = "* * * * * *"으로 변경
           (매월 1일 스케줄 -> 1초마다 스케줄)
        2. @Ignore 삭제
        3. 테스트 코드 실행
    -------------------------------------------------------------------------*/
    @Ignore
    @Test
    public void cleanUpMonthlyProfitAndSoldTest() {
        bookRepository.save(Book.builder()
                .monthlyProfit(10000000)
                .monthlySold(1000)
                .price(10000)
                .build());
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            Book book = bookRepository.findAll().get(0);
            assertThat(book.getMonthlyProfit()).isEqualTo(0);
            assertThat(book.getMonthlySold()).isEqualTo(0);
        }
    }

    @TestConfiguration
    static class SchedulingTestConfig implements SchedulingConfigurer {

        @Autowired
        private BookService bookService;

        @Override
        public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
            List<CronTask> cronTaskList = taskRegistrar.getCronTaskList();
            List<CronTask> newCronTaskList = new ArrayList<>();

            for (CronTask task : cronTaskList) {
                ScheduledMethodRunnable runnable = (ScheduledMethodRunnable) task.getRunnable();
                if (runnable.getTarget() instanceof BookService) {
                    newCronTaskList.add(new CronTask(runnable, task.getExpression()));
                    calledMethodName = runnable.getMethod().getName();
                }
            }
            taskRegistrar.setCronTasksList(newCronTaskList);
        }
    }
}
