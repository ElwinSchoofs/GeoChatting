package com.example.ewaserver.Kerim;

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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Kerim Karaer 500800038
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {
  private User user;
  private final String TEST_EMAIL = "unit@test.com";
  private final String TEST_PASSWORD = "unit_test_password";
  private final String TEST_NICKNAME = "Unit Tester";

  @Autowired
  TestRestTemplate testRestTemplate;
  @Autowired
  UserRepository userRepository;
  @Autowired
  UserController userController;

  @BeforeEach
  public void setup() {
    user = new User(TEST_EMAIL, TEST_PASSWORD, TEST_NICKNAME);
    userRepository.save(user);
  }

  @AfterEach
  public void deleteUser() {
    userRepository.deleteById(user.getId());
  }

  @Test
  public void requestsAllUsersFromController() {
    assertEquals(new MappingJacksonValue(userRepository.findAll()).getValue(), this.userController.getAllUsers().getValue());
  }

  @Test
  void requestAllUsersFromEndPoint() {
    assertTrue(this.testRestTemplate.getForObject("/users", String.class).contains(TEST_EMAIL));
    assertTrue(this.testRestTemplate.getForObject("/users", String.class).contains(TEST_PASSWORD));
    assertTrue(this.testRestTemplate.getForObject("/users", String.class).contains(TEST_NICKNAME));
  }

  @Test
  public void requestPutUserByEndPoint() {
    User putUser = new User("testPut@email.com", "putWachtwoord", "putNickname");
    putUser.setId(user.getId());
    this.testRestTemplate.put("/users/" + user.getId(), putUser);
    assertEquals("testPut@email.com", userRepository.findById(user.getId()).getEmail());
  }

  @Test
  public void saveUserWithWrongParametersThrowsException() throws NoSuchMethodException {
    assertThrows(NoSuchMethodException.class, () -> {
      Class uClass = User.class;
      Constructor uCons = uClass.getConstructor(new Class[]{int.class});
      User testUser = (User) uCons.newInstance(1);
    });
  }

  @Test
  public void deletesExistingUserEqualToId() {
    // add a new user to only delete it
    User tempUser = new User("unit@test.nl", "unit_tester_123", "unit_tester");
    userRepository.save(tempUser);

    // Check id generation
    assertTrue(tempUser.getId() > 0);
    // Check user is saved
    assertNotNull(userRepository.findById(tempUser.getId()));
    // Make sure the object is just like a normal user
    assertEquals("unit@test.nl", tempUser.getEmail());
    assertEquals("unit_tester_123", tempUser.getPassword());
    assertEquals("unit_tester", tempUser.getNickname());

    // Delete user
    this.testRestTemplate.delete("/users/{id}", tempUser.getId());

    assertNull(userRepository.findById(tempUser.getId()));
  }

  @Test
  public void notDeletingExistingUserNotEqualToId() {
    // Attempt to delete
    this.testRestTemplate.delete("/users/{id}", user.getId() + 9999);

    // The attempt to delete is expected to fail, so user should still exist
    assertEquals(userRepository.findById(user.getId()), user);
  }

  @Test
  public void notDeletingExistingUserWithNoPathVariable() {
    List<User> expected = new ArrayList<>(userRepository.findAll());

    // Attempt to delete
    this.testRestTemplate.delete("/users/{id}", "");

    // The attempt to delete is expected to fail, so user should still exist
    assertEquals(new MappingJacksonValue(expected).getValue(), userController.getAllUsers().getValue());
  }

  @Test
  public void addSomePointsToUser(){
    int pointsToAdd = 10;
    // add a new user to only add points to it
    User tempUser = new User("unit_4@test.nl", "unit_tester_sqwe123", "unit_tester_4");
    userRepository.save(tempUser);

    // Make sure the user is properly set up
    assertTrue(tempUser.getId() > 0);
    assertNotNull(userRepository.findById(tempUser.getId()));
    tempUser = userRepository.findById(tempUser.getId());
    assertEquals(0, (long) tempUser.getTotalPoints());

    String url = "/users/" + tempUser.getId() + "/add-points";
    HttpEntity<Integer> request = new HttpEntity<>(pointsToAdd);
    ResponseEntity<User> response = this.testRestTemplate.postForEntity(url, request, User.class);

    assertThat(HttpStatus.OK.equals(response.getStatusCode()));

    User responseUser = response.getBody();

    assertNotNull(responseUser);
    assertEquals(pointsToAdd, (long) responseUser.getTotalPoints());
  }

  @Test
  public void failToAddNegativePointsToUser(){
    // add a new user to only add points to it
    User tempUser = new User("unit_5@test.nl", "unit_tester_qwyvasd", "unit_tester_5");
    userRepository.save(tempUser);

    // Make sure the user is properly set up
    assertTrue(tempUser.getId() > 0);
    assertNotNull(userRepository.findById(tempUser.getId()));
    tempUser = userRepository.findById(tempUser.getId());
    assertEquals(0, (long) tempUser.getTotalPoints());

    String url = "/users/" + tempUser.getId() + "/add-points";
    HttpEntity<Integer> request = new HttpEntity<>(-10);
    ResponseEntity<User> response = this.testRestTemplate.postForEntity(url, request, User.class);

    assertThat(HttpStatus.BAD_REQUEST.equals(response.getStatusCode()));

    assertEquals(0L, (long) tempUser.getTotalPoints());
  }

  @Test
  public void failToAddPointsToNonExistingUser(){
    // add a new user to only add points to it
    User tempUser = new User("unit_6@test.nl", "unit_tester_tuifgh", "unit_tester_6");
    tempUser.setId(9999999999999999L);

    // New users are expected to have zero points
    assertEquals(0, (long) tempUser.getTotalPoints());

    String url = "/users/" + tempUser.getId() + "/add-points";
    HttpEntity<Integer> request = new HttpEntity<>(10);
    ResponseEntity<User> response = this.testRestTemplate.postForEntity(url, request, User.class);

    assertThat(HttpStatus.NOT_FOUND.equals(response.getStatusCode()));

    assertEquals(0L, (long) tempUser.getTotalPoints());
  }

}
