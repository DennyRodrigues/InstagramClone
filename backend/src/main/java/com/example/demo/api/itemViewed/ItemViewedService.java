package com.example.demo.api.itemViewed;


import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.post.Post;
import com.example.demo.api.post.PostRepo;
import com.example.demo.api.user.User;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemViewedService {
        private final ItemViewedRepo itemViewedRepo;
        private final AuthenticationService authenticationService;
        private final PostRepo postRepository;

    public List<ItemViewed> markPostsAsSeen(ItemViewedRequest request) {
        List<Long> items =  request.items;
        if(items.isEmpty()){
            throw new ApiRequestException("List of Items was empty", HttpStatus.BAD_REQUEST);
        }
        User author = authenticationService.getCurrentUser();
        List<Post> postOptional = postRepository.findAllById(items);
        ArrayList<ItemViewed> markAsViewedList = new ArrayList<>();
        for (Post post : postOptional){
            ItemViewed itemViewed = new ItemViewed();
            itemViewed.setAuthor(author);
            itemViewed.setItemType(ItemType.POST);
            itemViewed.setLikeable(post);
            markAsViewedList.add(itemViewed);
        }
        return itemViewedRepo.saveAll(markAsViewedList);
    }

}
