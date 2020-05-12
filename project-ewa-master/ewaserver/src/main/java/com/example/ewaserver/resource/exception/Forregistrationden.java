package com.example.ewaserver.resource.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class Forregistrationden extends RuntimeException {
  public Forregistrationden(String message) {
    super(message);
  }
}
