package com.example.ewaserver.Luuk;

import com.example.ewaserver.controller.UserController;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Luuk Wagenaar 500799908
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

  private User user;

  @Autowired
  TestRestTemplate testRestTemplate;
  @Autowired
  UserRepository userRepository;
  @Autowired
  UserController userController;
  @Autowired
  UserController application = null;

  @BeforeEach
  public void setup() {
    user = new User("user@test.com", "password123", "Tester");
    userRepository.save(user);
  }

  @AfterEach
  public void deleteUser() {
    userRepository.deleteById(user.getId());
  }

  @Test
  public void requestUserByIdFromController() {
    String urlToNotFindableId = "/users/" + user.getId() + 123456;
    ResponseEntity<User> response = this.testRestTemplate.postForEntity(urlToNotFindableId, null, User.class);
    assertThat(HttpStatus.NOT_FOUND.equals(response.getStatusCode()));
  }

  @Test
  void checkIfControllerStartedSuccessfully(){
    assertNotNull(application);
    System.out.println("Application auto-configuration has succeeded");
  }
}
