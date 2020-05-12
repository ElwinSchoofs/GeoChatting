//package com.example.ewaserver.repository;
//
//import com.example.ewaserver.entity.User;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class UserRepositoryCommandLineRunner implements CommandLineRunner {
//
//  private static final Logger log = LoggerFactory.getLogger(UserRepositoryCommandLineRunner.class);
//
//  @Autowired
//  private EntityRepository<User> userRepository;
//
//  @Override
//  public void run(String... args) throws Exception {
//    User user = new User("elwinschoofs@hotmail.com", "Repo123", "Soy Boi 2");
//
//    userRepository.save(user);
//    log.info("New User is created : " + user);
//  }
//}
