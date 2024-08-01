package com.example.demo.api.ping;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping")
@RequiredArgsConstructor
public class Ping {

    @GetMapping
    String getLikes() {
        System.out.println("Server ping");
        return "Hello";
    }
}
