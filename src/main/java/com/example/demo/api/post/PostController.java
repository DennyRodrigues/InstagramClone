package com.example.demo.api.post;

import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.student.Student;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/v1/post")
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final AuthenticationService authenticationService;

    @GetMapping
    public Optional<List<Post>> getPostsByUser(Authentication authentication) {

        return postService.getPostsByUser(Long.valueOf(authentication.getName()));
    }
}
