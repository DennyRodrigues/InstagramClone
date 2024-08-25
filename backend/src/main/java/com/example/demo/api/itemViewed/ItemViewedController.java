package com.example.demo.api.itemViewed;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/viewed")
@RequiredArgsConstructor
public class ItemViewedController {
    private final ItemViewedService itemViewedService;

    @PostMapping(path = "/post")
    public List<ItemViewed> markPostsAsSeen(@RequestBody ItemViewedRequest listOfPost) throws IOException {
        return itemViewedService.markPostsAsSeen(listOfPost);
    }
}
