package com.example.demo.api.likes;

import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.auth.user.User;
import com.example.demo.api.auth.user.UserRepository;
import com.example.demo.api.comment.Comment;
import com.example.demo.api.comment.CommentRepo;
import com.example.demo.api.post.Post;
import com.example.demo.api.post.PostRepo;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserLikeService {
    private final UserLikeRepo userLikeRepo;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final CommentRepo commentRepo;
    private final PostRepo postRepo;


    public UserLike likePost(Long itemId) {
        User author = authenticationService.getCurrentUser();
        Post post = postRepo.findById(itemId)
                            .orElseThrow(() -> new ApiRequestException("Post with ID " + itemId + " not found",
                                                                       HttpStatus.BAD_REQUEST));


        if (userLikeRepo.findByPostAndAuthor(post, author)
                        .isPresent()) {
            throw new ApiRequestException("Like for Post with ID " + itemId + " already exists",
                                          HttpStatus.BAD_REQUEST);
        }
        UserLike like = new UserLike();
        like.setAuthor(author);
        like.setLikeable(post);
        like.setItemType(LikableItemType.POST);
        userLikeRepo.save(like);
        return like;
    }

    public UserLike deletePost(Long itemId) {
        User author = authenticationService.getCurrentUser();
        Post post = postRepo.findById(itemId)
                            .orElseThrow(() -> new ApiRequestException("Post with ID " + itemId + " not found",
                                                                       HttpStatus.BAD_REQUEST));

        UserLike like = userLikeRepo.findByPostAndAuthor(post, author)
                                    .orElseThrow(() -> new ApiRequestException("Like for post with ID " + itemId + " not found",
                                                                               HttpStatus.BAD_REQUEST));
        userLikeRepo.delete(like);
        return like;
    }

    public UserLike likeComment(Long itemId) {
        User author = authenticationService.getCurrentUser();
        Comment comment = commentRepo.findById(itemId)
                                     .orElseThrow(() -> new ApiRequestException("Comment with ID " + itemId + " not found",
                                                                                HttpStatus.BAD_REQUEST));

        if (userLikeRepo.findByCommentAndAuthor(comment, author)
                        .isPresent()) {
            throw new ApiRequestException("Like for comment with ID " + itemId + " already exists",
                                          HttpStatus.BAD_REQUEST);
        }


        UserLike like = new UserLike();
        like.setAuthor(author);
        like.setLikeable(comment);
        like.setItemType(LikableItemType.COMMENT);
        userLikeRepo.save(like);
        return like;
    }

    public UserLike deleteComment(Long itemId) {
        User author = authenticationService.getCurrentUser();
        Comment comment = commentRepo.findById(itemId)
                                     .orElseThrow(() -> new ApiRequestException("Comment with ID " + itemId + " not found",
                                                                                HttpStatus.BAD_REQUEST));

        UserLike like = userLikeRepo.findByCommentAndAuthor(comment, author)
                                    .orElseThrow(() -> new ApiRequestException("Like for comment with ID " + itemId + " not found",
                                                                               HttpStatus.BAD_REQUEST));
        userLikeRepo.delete(like);
        return like;
    }

    public List<UserLike> getLikes() {
        return userLikeRepo.findAll();
    }
}
