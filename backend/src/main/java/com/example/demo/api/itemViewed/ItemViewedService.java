package com.example.demo.api.itemViewed;


import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.post.Post;
import com.example.demo.api.post.PostRepo;
import com.example.demo.api.user.User;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemViewedService {
        private final ItemViewedRepo itemViewedRepo;
        private final AuthenticationService authenticationService;
        private final PostRepo postRepository;

    public ItemViewed markPostAsSeen(Long postId) {
        User author = authenticationService.getCurrentUser();
        Optional<Post> postOptional = postRepository.findById(postId);
        if(postOptional.isEmpty()){
            throw new ApiRequestException("Post with id: " + postId + " doesn't exist.", HttpStatus.BAD_REQUEST);
        }
        Post post = postOptional.get();
        boolean alreadyViewed = itemViewedRepo.existsByAuthorAndLikeable(author, postRepository.getReferenceById(postId));
        if (alreadyViewed) {
            throw new ApiRequestException("Post has already been viewed by this user.", HttpStatus.CONFLICT);
        }

        ItemViewed itemViewed = new ItemViewed();
        itemViewed.setAuthor(author);
        itemViewed.setItemType(ItemType.POST);
        itemViewed.setLikeable(post);
        return itemViewedRepo.save(itemViewed);
    }

}
