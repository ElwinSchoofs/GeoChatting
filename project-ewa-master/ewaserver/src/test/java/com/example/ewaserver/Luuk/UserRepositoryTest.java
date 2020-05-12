package com.example.ewaserver.Luuk;

import com.example.ewaserver.EwaServerApplication;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.*;


/**
 * @author Luuk Wagenaar 500799908
 */

@SpringBootTest(classes = EwaServerApplication.class)
class UserRepositoryTest {

  private User user;
  private User testUser;

  @Autowired
  UserRepository userRepository;

  @BeforeEach
  public void setup() {
    user = new User("testmail@mail.com", "testWachtwoord", "testNickname");
  }

  @Test
  void checkIfApplicationStartedSuccessfully() {
    assertNotNull(userRepository);
  }

  @Test
  void checkIfUserAmountGetsUpdatedAfterAdd() {
    int exp = userRepository.findAll().size() + 1;
    testUser = new User("testmail123@mail.com", "testpw", "testnick123");
    userRepository.save(testUser);
    int act = userRepository.findAll().size();
    assertEquals(exp, act);
  }

  @Test
  void checkIfUserAmountGetsUpdatedAfterDelete() {
    testUser = new User("testmail123@mail.com", "testpw", "testnick123");
    userRepository.save(testUser);
    int exp = userRepository.findAll().size();
    userRepository.deleteById(testUser.getId());
    int act = userRepository.findAll().size();
    assertEquals(exp - 1, act);
  }

  @Test
  void checkForIndexOutOfBounds() throws IndexOutOfBoundsException  {
    assertThrows(IndexOutOfBoundsException.class, () ->  userRepository.findAll().get(9999));
  }
}
