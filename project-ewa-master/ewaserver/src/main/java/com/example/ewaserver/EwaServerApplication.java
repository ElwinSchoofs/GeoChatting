package com.example.ewaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class EwaServerApplication {

  public static void main(String[] args) {
    SpringApplication.run(EwaServerApplication.class, args);
    System.out.println("EwaServer started.");
  }

}
