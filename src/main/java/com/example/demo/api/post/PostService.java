package com.example.demo.api.post;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private PostRepo postRepository;

    public Optional<List<Post>> getPostsByUser(Long userId) {
        return postRepository.getPostsByUser(userId);
    }
}
