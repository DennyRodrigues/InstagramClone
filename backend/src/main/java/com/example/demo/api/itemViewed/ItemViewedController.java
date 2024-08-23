package com.example.demo.api.itemViewed;

import com.example.demo.api.post.PostService;
import com.example.demo.api.post.customModels.PostWithLikesDTO;
import com.example.demo.api.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/viewed")
@RequiredArgsConstructor
public class ItemViewedController {
    private final ItemViewedService itemViewedService;

    @PostMapping(path = "/post/{postId}")
    public ItemViewed getAllPosts(@PathVariable("postId") Long postId) throws IOException {
        return itemViewedService.markPostAsSeen(postId);
    }
}
