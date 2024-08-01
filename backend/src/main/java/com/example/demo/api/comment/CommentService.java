package com.example.demo.api.comment;


import com.example.demo.api.user.User;
import com.example.demo.api.user.UserRepository;
import com.example.demo.api.post.Post;
import com.example.demo.api.post.PostRepo;
import com.example.demo.utils.exception.ApiRequestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final PostRepo postRepository;
    private final UserRepository userRepository;

    public Comment addNewComment(Integer userId, Long postId, @Valid CommentRequest commentRequest) {
        Comment newComment = new Comment();
        User author = userRepository.findById(userId)
                                    .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new ApiRequestException("Post with ID " + postId + " not found",
                                                                             HttpStatus.BAD_REQUEST));
        newComment.setAuthor(author);
        newComment.setDescription(commentRequest.getDescription());
        newComment.setPost(post);
        return commentRepo.save(newComment);
    }

    public Optional<List<Comment>> getComments(Integer userId, Long postId) {
        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new ApiRequestException("Post with ID " + postId + " not found"));

        return commentRepo.findByPostId(postId);
    }
}
