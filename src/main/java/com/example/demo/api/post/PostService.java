package com.example.demo.api.post;

import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.followers.FollowRelationshipService;
import com.example.demo.api.post.customModels.LikeDTO;
import com.example.demo.api.post.customModels.PostWithLikesDTO;
import com.example.demo.api.user.User;
import com.example.demo.api.user.UserRepository;
import com.example.demo.api.image.ImageService;
import com.example.demo.utils.exception.ApiRequestException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepo postRepository;
    private final ImageService imageService;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final FollowRelationshipService followRelationshipService;

    public Optional<List<Post>> getPostsByUser(Integer userId) {
        User user = userRepository.findById(userId)
                                  .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return postRepository.getPostsByUser(user);
    }

    public Optional<List<Post>> getAllPosts() {
        return Optional.of(postRepository.findAll());
    }

    public List<Object[]> getPostsAndFilteredLikes(List<Integer> followingList) {
        return postRepository.getPostsWithLikesByFollowingList(followingList);
    }

    @SuppressWarnings("unchecked")
    public List<PostWithLikesDTO> getPostsWithFollowingLikes() throws IOException {
        User currentUser = authenticationService.getCurrentUser();
        ArrayList<Integer> followingList = followRelationshipService.getFollowingList(currentUser);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Object[]> results = postRepository.getPostsWithLikesByFollowingList(followingList);

        List<PostWithLikesDTO> postWithLikesDTOs = new ArrayList<>();
        for (Object[] result : results) {
            Long postId = ((Number) result[0]).longValue();
            Long postAuthorId = ((Number) result[1]).longValue();
            String authorUsername = (String) result[2];
            String authorPhoto = (String) result[3];
            byte[] imagesBytes = (byte[]) result[4];
            String description = (String) result[5];
            Timestamp createdAtTimestamp = (Timestamp) result[6];
            Timestamp updatedAtTimestamp = (Timestamp) result[7];
            ArrayList<String> imagesList;

            try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(imagesBytes))) {
                imagesList = (ArrayList<String>) ois.readObject();
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }

            Number likesCount = (Number) result[8];
            // Parse likes JSON
            String likesJson = (String) result[9];
            JsonNode likesNode = objectMapper.readTree(likesJson);
            List<LikeDTO> likes = new ArrayList<>();
            if (likesNode.isArray()) {
                for (JsonNode likeNode : (ArrayNode) likesNode) {
                    Long likeId = likeNode.get("like_id")
                                          .asLong();
                    Long authorId = likeNode.get("author_id")
                                            .asLong();
                    likes.add(new LikeDTO(likeId, authorId));
                }
            }

            PostWithLikesDTO postWithLikesDTO = new PostWithLikesDTO(
                    postId,
                    postAuthorId,
                    authorUsername,
                    authorPhoto,
                    description,
                    imagesList,
                    createdAtTimestamp,
                    updatedAtTimestamp,
                    likesCount,
                    likes
            );

            postWithLikesDTOs.add(postWithLikesDTO);
        }


        return postWithLikesDTOs;
    }

    public Post saveNewPost(Integer userId, PostRequest request) {
        User author = userRepository.findById(userId)
                                    .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
        Post post = new Post();
        post.setAuthor(author);
        post.setDescription(request.getDescription());

        // Save Image on local folder.
        try {
            ArrayList<String> images = imageService.saveAllImagesToStorage(request.getImages());
            post.setImages(images);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

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
