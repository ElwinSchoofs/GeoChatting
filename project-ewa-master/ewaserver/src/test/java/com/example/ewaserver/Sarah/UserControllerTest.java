package com.example.ewaserver.Sarah;

import com.example.ewaserver.controller.UserController;
import com.example.ewaserver.entity.Post;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.UserDAOService;
import com.example.ewaserver.repository.UserRepository;
import com.example.ewaserver.resource.exception.Forregistrationden;
import com.example.ewaserver.resource.exception.ResourceNotFound;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.lang.reflect.Constructor;
import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Sarah Rehman 500798305
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

  private User putUser;

  @Autowired
  TestRestTemplate testRestTemplate;
  @Autowired
  UserRepository userRepository;
  @Autowired
  UserController userController;
  @Autowired
  UserDAOService userDAOService;

  @BeforeEach
  public void setup() {
    putUser = new User("testMail@mail.com", "testWachtwoord", "testNickname");
    userRepository.save(putUser);
  }

  @AfterEach
  public void deleteUser() {
    userRepository.deleteById(putUser.getId());
  }

  @Test
  public void requestUserByIdFromController() {
    User savedUser = userController.getUserById(putUser.getId());
    assertEquals(putUser.getId(), savedUser.getId());
    assertEquals(putUser.getEmail(), savedUser.getEmail());
    assertEquals(putUser.getPassword(), savedUser.getPassword());
    assertEquals(putUser.getNickname(), savedUser.getNickname());
  }

  @Test
  public void requestUserByIdFromEndPoint() {
    assertTrue(this.testRestTemplate.getForObject("/users/" + putUser.getId(), String.class).contains("testMail@mail.com"));
    assertTrue(this.testRestTemplate.getForObject("/users/" + putUser.getId(), String.class).contains("testNickname"));
    assertTrue(this.testRestTemplate.getForObject("/users/" + putUser.getId(), String.class).contains("testWachtwoord"));
  }

  @Test
  public void requestPostUserByEndPoint() {
    //create user that gets posted
    User postUser = new User("controllerTest@Post.nl", "postWachtwoord", "postNickname");
    //perform POST request
    ResponseEntity<User> response = this.testRestTemplate.postForEntity("/users/", postUser, User.class);
    //Checks if posted and if the data is correct
    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    Assert.assertThat(userRepository.findById(response.getBody().getId()), equalTo(response.getBody()));
    //Deletes User so nothing changed in the Database
    userRepository.deleteById(response.getBody().getId());
  }
  @Test
  public void requestUserWithWrongIdThrowsException() throws ResourceNotFound {
    assertThrows(ResourceNotFound.class, () ->
      userController.getUserById((long) -1));
  }


  @Test
  void requestDeleteUserFromEndPoint() {
    User user = new User("testMail@mail.com", "testWachtwoord", "testNickname");
    putUser.setId(putUser.getId());
    this.testRestTemplate.delete("/users/");
  }

  @Test
  void SendNewUserToEndpoint(){
    User user = new User("testMail@mail.com", "testWachtwoord", "testNickname");
    user.setNickname("testNicknameVersion2");
    user.setEmail("testMailVersion2@mail.com");
    user.setPassword("testWachtwoordVersion2");
    userRepository.save(user);
    assertEquals("testNicknameVersion2", userRepository.findById(user.getId()).getNickname());
  }

}
