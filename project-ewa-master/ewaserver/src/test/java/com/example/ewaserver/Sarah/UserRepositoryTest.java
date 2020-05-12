package com.example.ewaserver.Sarah;

import com.example.ewaserver.EwaServerApplication;
import com.example.ewaserver.entity.Setting;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.lang.reflect.Constructor;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Sarah Rehman 500798305
 */

@SpringBootTest(classes = EwaServerApplication.class)
class UserRepositoryTest {

  private User user;

  @Autowired
  UserRepository userRepository;

  @BeforeEach
  public void setup() {
    user = new User("testMail@mail.com", "testWachtwoord", "testNickname");
  }

  @Test
  public void createUserRepoWithWrongMethod() throws NoSuchMethodException {
    assertThrows(NoSuchMethodException.class ,() -> {
      Class uClass = UserRepository.class;
      Constructor uCons = uClass.getConstructor(new Class[]{int.class});
      UserRepository testUserRepository = (UserRepository)uCons.newInstance(1);
    });
  }

  @Test
  public void newUserCRUDInRepository() {
    //add a user
    User savedUser = userRepository.save(user);
    //check if the id is valid
    assertTrue(savedUser.getId() > 0);
    //check added variables
    assertEquals("testMail@mail.com", savedUser.getEmail());
    assertEquals("testWachtwoord", savedUser.getPassword());
    assertEquals("testNickname", savedUser.getNickname());
    assertEquals(user, savedUser);
    //find the added user
    User newUser= userRepository.findById(savedUser.getId());
    assertEquals(savedUser.getEmail(), newUser.getEmail());
    assertEquals(savedUser.getPassword(), newUser.getPassword());
    assertEquals(savedUser.getNickname(), newUser.getNickname());
    //delete the user
    assertTrue(userRepository.deleteById(savedUser.getId()));
    assertNull(userRepository.findById(savedUser.getId()));
  }
}
