package com.example.demo.api.post;

import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.user.CustomUserDetails;
import com.example.demo.api.user.User;
import com.example.demo.api.followers.FollowRelationshipService;
import com.example.demo.config.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/post")
@RequiredArgsConstructor

public class PostController {
    private final PostService postService;
    private final AuthenticationService authenticationService;
    private final FollowRelationshipService followRelationshipService;
    private JwtService jwtService;

    @GetMapping
    public Optional<List<Post>> getAllPosts() {
        User currentUser = authenticationService.getCurrentUser();
        ArrayList<String> followingList = followRelationshipService.getFollowingList(currentUser);
        return postService.getAllPosts();
    }

    @GetMapping(path = "{userId}")
    public Optional<List<Post>> getPostsByUser(@PathVariable("userId") Integer userId) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        return postService.getPostsByUser(userId);
    }

    @PostMapping
    public Post createNewPost(@Valid @RequestBody PostRequest request) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        return postService.saveNewPost(user.getId(), request);
    }

    @Operation(summary = "Update a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the book",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Post.class))})})
    @PutMapping(path = "{postId}")
    public Post UpdatePost(@Valid @RequestBody
                           PostRequest request, @PathVariable("postId") Long postId) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        return postService.updatePost(user.getId(), postId, request);
    }

    @DeleteMapping(path = "{postId}")
    public void UpdatePost(@PathVariable("postId") Long postId) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        postService.deletePost(user.getId(), postId);
    }

    @GetMapping(path = "{postId}")
    public Post getPostDetails(@PathVariable("postId") Long postId) {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        return postService.getPostDetails(postId);
    }
}
