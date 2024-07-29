package com.example.demo.notification;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationRequest {
    private String title;
    private String message;
    private String topic;
    private List<String> token;
    Map<String, Object> data;
}