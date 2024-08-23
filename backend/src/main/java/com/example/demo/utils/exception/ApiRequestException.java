package com.example.demo.utils.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class ApiRequestException extends ResponseStatusException {
    public HttpStatus httpStatus;
    public String message;

    public ApiRequestException(String message) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
        this.message = message;
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public ApiRequestException(String message, Throwable cause) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
        this.message = message;
    }

    public ApiRequestException(String message, HttpStatus httpStatus, Throwable cause) {
        super(httpStatus, message);
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public ApiRequestException(String message, HttpStatus httpStatus) {
        super(httpStatus, message);
        this.message = message;
        this.httpStatus = httpStatus;
    }

}

