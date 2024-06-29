package com.example.demo.api.likes;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/like")
@RequiredArgsConstructor
public class UserLikeController {
    private final UserLikeService userLikeService;


    @GetMapping
    List<UserLike> getLikes() {
        return userLikeService.getLikes();
    }

    //    POSTS
    @PostMapping("/post/{itemId}")
    UserLike likePost(@PathVariable Long itemId) {
        return userLikeService.likePost(itemId);
    }

    @DeleteMapping("/post/{itemId}")
    UserLike deletePost(@PathVariable Long itemId) {
        return userLikeService.deletePost(itemId);
    }

    //    COMMENTS
    @PostMapping("/comment/{itemId}")
    UserLike likeComment(@PathVariable Long itemId) {
        return userLikeService.likeComment(itemId);
    }


    @DeleteMapping("/comment/{itemId}")
    UserLike deleteComment(@PathVariable Long itemId) {
        return userLikeService.deleteComment(itemId);
    }

}
