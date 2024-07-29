package com.example.demo.notification;

import com.example.demo.api.post.PostService;
import io.github.jav.exposerversdk.PushClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/api/v1/notification")
    public ResponseEntity sendNotificationToMultipleUsers(@RequestBody NotificationRequest request) throws ExecutionException, InterruptedException, PushClientException {
        List<String> tokens = request.getToken();
        notificationService.sendPushNotification(tokens.get(0),
                                                 request.getTitle(),
                                                 request.getMessage(),
                                                 request.getData());
        return new ResponseEntity<>(new NotificationResponse(HttpStatus.OK.value(), "Notification has been sent."),
                                    HttpStatus.OK);
    }

}