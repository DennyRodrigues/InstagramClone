package com.example.demo.api.comment;

import com.example.demo.api.user.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping(path = "{postId}/comment")
    public Comment createNewComment(@PathVariable("postId") Long postId, @Valid @RequestBody CommentRequest comment) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        return commentService.addNewComment(user.getId(), postId, comment);
    }

    @GetMapping(path = "{postId}/comment")
    public Optional<List<Comment>> getComments(@PathVariable("postId") Long postId) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        return commentService.getComments(user.getId(), postId);
    }


}
