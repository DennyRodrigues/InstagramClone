package com.example.demo.api.followers;


import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/follow")
@RequiredArgsConstructor
public class FollowRelationshipController {

    private final FollowRelationshipService followRelationshipService;

    @PostMapping(path = "{userId}")
    public boolean AddFollow(@PathVariable("userId") Integer userId) {

        followRelationshipService.addFollow(userId);
        return true;
    }
}
