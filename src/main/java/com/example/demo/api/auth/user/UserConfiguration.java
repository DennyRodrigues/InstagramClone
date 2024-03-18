package com.example.demo.api.auth.user;

import com.example.demo.api.student.Student;
import com.example.demo.api.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class UserConfiguration {
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner commandLineRunnerUser(UserRepository repository) {
        return args -> {
            var david = User.builder()
                            .firstname("david")
                            .lastname("joao")
                            .lastname("david_joao")
                            .email("david@gmail.com")
                            .password(passwordEncoder.encode("123"))
                            .role(Role.USER)
                            .build();
            repository.saveAll((
                                       List.of(david)
                               ));
        };
    }
}
