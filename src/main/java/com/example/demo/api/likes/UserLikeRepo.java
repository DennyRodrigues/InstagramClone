package com.example.demo.api.likes;

import com.example.demo.api.auth.user.User;
import com.example.demo.api.comment.Comment;
import com.example.demo.api.post.Post;
import com.example.demo.models.Likeable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLikeRepo extends JpaRepository<UserLike, Long> {

    Optional<UserLike> findByLikeableAndAuthorAndItemType(Likeable likeable, User author, LikableItemType itemType);

    // Method to find a UserLike related to a post
    default Optional<UserLike> findByPostAndAuthor(Post post, User author) {
        return findByLikeableAndAuthorAndItemType(post, author, LikableItemType.POST);
    }

    // Method to find a UserLike related to a comment
    default Optional<UserLike> findByCommentAndAuthor(Comment comment, User author) {
        return findByLikeableAndAuthorAndItemType(comment, author, LikableItemType.COMMENT);
    }
}
