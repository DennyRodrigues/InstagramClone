package com.example.demo.api.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepo extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.author = ?1")
    public Optional<List<Post>> getPostsByUser(Long userId);
}
