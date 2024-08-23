package com.example.demo.api.itemViewed;

import com.example.demo.api.comment.Comment;
import com.example.demo.api.post.Post;
import com.example.demo.api.user.User;
import com.example.demo.models.Likeable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemViewedRepo extends JpaRepository<ItemViewed, Long> {
    boolean existsByAuthorAndLikeable(User author, Likeable likeable);
}
