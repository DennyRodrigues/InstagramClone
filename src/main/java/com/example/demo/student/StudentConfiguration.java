package com.example.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfiguration {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository){
        return args -> {
            Student mariam = new Student(

                    "Mariam",
                    "maraing@gmailcom",
                    LocalDate.of(2000, Month.JANUARY, 5)
            );
            Student David = new Student(
                    "David",
                    "David22@gmailcom",
                    LocalDate.of(2001   , Month.JANUARY, 7)
            );
            repository.saveAll((
                    List.of(mariam, David)
                    ));
        };
    }
}
