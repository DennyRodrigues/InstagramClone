package com.example.demo.api.likes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLikeRepo extends JpaRepository<UserLike, Long> {
}
