package com.example.demo.exception;

import java.time.ZonedDateTime;

public class ApiException {
    private final String message;
    private final Throwable throwable;
    private final int httpStatusCode;
    private final ZonedDateTime timestamp;

    public ApiException(String message, Throwable throwable, int httpStatusCode, ZonedDateTime timestamp) {
        this.message = message;
        this.throwable = throwable;
        this.httpStatusCode = httpStatusCode;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public int getHttpStatusCode() {
        return httpStatusCode;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
}
