package com.example.demo.api.post;

import com.example.demo.api.auth.user.User;
import com.example.demo.api.auth.user.UserRepository;
import com.example.demo.utils.exception.ApiRequestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepo postRepository;
    private final UserRepository userRepository;

    public Optional<List<Post>> getPostsByUser(Integer userId) {
        User user = userRepository.findById(userId)
                                  .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Optional<List<Post>> posts = postRepository.getPostsByUser(user);
        return posts;
    }

    public Post saveNewPost(Integer userId, PostRequest request) {
        User author = userRepository.findById(userId)
                                    .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
        Post post = new Post();
        post.setAuthor(author);
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setImages(request.getImages());


        return postRepository.save(post);
    }

    public Post updatePost(Integer userId, Long postId, @Valid PostRequest newPost) {
        User author = userRepository.findById(userId)
                                    .orElseThrow(() -> new ApiRequestException("User with ID " + userId + " not found",
                                                                               HttpStatus.BAD_REQUEST));

        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new ApiRequestException("Post with ID " + postId + " not found",
                                                                             HttpStatus.BAD_REQUEST));
        post.setAuthor(author);
        post.setTitle(newPost.getTitle());
        post.setDescription(newPost.getDescription());
        post.setImages(newPost.getImages());
        return postRepository.save(post);

    }

    public void deletePost(Integer userId, Long postId) {
        User author = userRepository.findById(userId)
                                    .orElseThrow(() -> new ApiRequestException("User with ID " + userId + " not found",
                                                                               HttpStatus.BAD_REQUEST));

        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new ApiRequestException("Post with ID " + postId + " not found",
                                                                             HttpStatus.BAD_REQUEST));
        postRepository.delete(post);
    }

    public Post getPostDetails(Long postId) {
        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new ApiRequestException("Post with ID " + postId + " not found",
                                                                             HttpStatus.BAD_REQUEST));
        return post;
    }
}
