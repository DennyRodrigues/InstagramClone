package com.example.demo.notification;

import com.example.demo.api.user.projections.NotificationTokenProjection;
import io.github.jav.exposerversdk.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static org.hibernate.sql.ast.SqlTreeCreationLogger.LOGGER;

@Service
@RequiredArgsConstructor
public class NotificationService {

    public void sendPushNotification(String token,
                                     String title,
                                     String message,
                                     Map<String, Object> data) throws PushClientException {
        if (!PushClient.isExponentPushToken(token)) throw new Error("Token:" + token + " is not a valid token.");

        ExpoPushMessage expoPushMessage = new ExpoPushMessage();
        expoPushMessage.getTo()
                       .add(token);
        expoPushMessage.setTitle(title);
        expoPushMessage.setBody(message);
        expoPushMessage.setData(data);

        List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
        expoPushMessages.add(expoPushMessage);

        PushClient client = new PushClient();
        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

        List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();

        for (List<ExpoPushMessage> chunk : chunks) {
            messageRepliesFutures.add(client.sendPushNotificationsAsync(chunk));
        }

        // Wait for each completable future to finish
        List<ExpoPushTicket> allTickets = new ArrayList<>();
        for (CompletableFuture<List<ExpoPushTicket>> messageReplyFuture : messageRepliesFutures) {
            try {
                allTickets.addAll(messageReplyFuture.get());
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> zippedMessagesTickets = client.zipMessagesTickets(
                expoPushMessages,
                allTickets);

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> okTicketMessages = client.filterAllSuccessfulMessages(
                zippedMessagesTickets);
        String okTicketMessagesString = okTicketMessages.stream()
                                                        .map(p -> "Title: " + p.message.getTitle() + ", Id:" + p.ticket.getId())
                                                        .collect(Collectors.joining(","));
        LOGGER.info("Received OK ticket for " + okTicketMessages.size() + " messages: " + okTicketMessagesString);

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> errorTicketMessages = client.filterAllMessagesWithError(
                zippedMessagesTickets);
        String errorTicketMessagesString = errorTicketMessages.stream()
                                                              .map(p -> "Title: " + p.message.getTitle() + ", Error: " + p.ticket.getDetails()
                                                                                                                                 .getError())
                                                              .collect(Collectors.joining(","));
        LOGGER.error("Received ERROR ticket for " + errorTicketMessages.size() + " messages: " + errorTicketMessagesString);

    }

    public void sendPushNotificationToMultipleUsers(List<NotificationTokenProjection> tokensList,
                                                    String title,
                                                    String message,
                                                    Map<String, Object> data) throws PushClientException {


        List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
        if (tokensList == null) return;
        for (NotificationTokenProjection token : tokensList) {
            if (token == null) continue; // Skip null tokens

            String tokenString = token.getNotificationToken();
            if (tokenString == null || !PushClient.isExponentPushToken(tokenString)) continue; // Skip invalid tokens

            ExpoPushMessage expoPushMessage = new ExpoPushMessage();
            expoPushMessage.getTo()
                           .add(tokenString);
            expoPushMessage.setTitle(title);
            expoPushMessage.setBody(message);
            expoPushMessage.setData(data);
            expoPushMessages.add(expoPushMessage);
        }


        PushClient client = new PushClient();
        List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

        List<CompletableFuture<List<ExpoPushTicket>>> messageRepliesFutures = new ArrayList<>();

        for (List<ExpoPushMessage> chunk : chunks) {
            messageRepliesFutures.add(client.sendPushNotificationsAsync(chunk));
        }

        // Wait for each completable future to finish
        List<ExpoPushTicket> allTickets = new ArrayList<>();
        for (CompletableFuture<List<ExpoPushTicket>> messageReplyFuture : messageRepliesFutures) {
            try {
                allTickets.addAll(messageReplyFuture.get());
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> zippedMessagesTickets = client.zipMessagesTickets(
                expoPushMessages,
                allTickets);

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> okTicketMessages = client.filterAllSuccessfulMessages(
                zippedMessagesTickets);
        String okTicketMessagesString = okTicketMessages.stream()
                                                        .map(p -> "Title: " + p.message.getTitle() + ", Id:" + p.ticket.getId())
                                                        .collect(Collectors.joining(","));
        LOGGER.info("Received OK ticket for " + okTicketMessages.size() + " messages: " + okTicketMessagesString);

        List<ExpoPushMessageTicketPair<ExpoPushMessage>> errorTicketMessages = client.filterAllMessagesWithError(
                zippedMessagesTickets);
        String errorTicketMessagesString = errorTicketMessages.stream()
                                                              .map(p -> "Title: " + p.message.getTitle() + ", Error: " + p.ticket.getDetails()
                                                                                                                                 .getError())
                                                              .collect(Collectors.joining(","));
        LOGGER.error("Received ERROR ticket for " + errorTicketMessages.size() + " messages: " + errorTicketMessagesString);
    }

    public void sendPushNotificationToMultipleUsers(List<NotificationTokenProjection> tokensList,
                                                    String title,
                                                    String message
    ) throws PushClientException {
        sendPushNotificationToMultipleUsers(tokensList, title, message, new HashMap<>());
    }
}