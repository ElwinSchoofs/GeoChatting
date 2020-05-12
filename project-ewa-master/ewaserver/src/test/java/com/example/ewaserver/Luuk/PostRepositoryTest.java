package com.example.ewaserver.Luuk;

import com.example.ewaserver.EwaServerApplication;
import com.example.ewaserver.entity.Post;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.PostRepository;
import com.example.ewaserver.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.lang.reflect.Constructor;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Luuk Wagenaar 500799908
 */

@SpringBootTest(classes = EwaServerApplication.class)
class PostRepositoryTest {

  private Post post;
  private User user;

  @Autowired
  private PostRepository postRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  PostRepository application = null;

  @BeforeEach
  public void setup() {
    user = new User("testMail@mail.com", "testWachtwoord", "testNickname");
    userRepository.save(user);
    post = new Post("Dit is een test", 500, 400, user);
  }

  @AfterEach
  public void deleteUser() {
    userRepository.deleteById(user.getId());
  }

  @Test
  void checkIfRepositoryStartedSuccessfully(){
    assertNotNull(application);
    System.out.println("Application auto-configuration has succeeded");
  }


  @Test
  public void newPostCRUDInRepository() {
    //add some post
    Post savedPost = postRepository.save(post);
    //check id generation
    assertTrue(savedPost.getId() > 0);
    //check added attributes
    assertEquals("Dit is een test", savedPost.getMessage());
    assertEquals(500, savedPost.getLatitude());
    assertEquals(400, savedPost.getLongitude());
    assertEquals(user, savedPost.getCreatedBy());
    //find added post
    Post newPost = postRepository.findById(savedPost.getId());
    assertEquals(savedPost.getId(), newPost.getId());
    assertEquals(savedPost.getMessage(), newPost.getMessage());
    assertEquals(savedPost.getLatitude(), newPost.getLatitude());
    assertEquals(savedPost.getLongitude(), newPost.getLongitude());
    assertEquals(savedPost.getCreatedBy(), newPost.getCreatedBy());
    //delete added post
    assertTrue(postRepository.deleteById(savedPost.getId()));
    assertNull(postRepository.findById(savedPost.getId()));
  }

  @Test
  public void createPostRepoWithWrongMethod() throws NoSuchMethodException {
    assertThrows(NoSuchMethodException.class ,() -> {
      Class pClass = PostRepository.class;
      Constructor pCons = pClass.getConstructor(new Class[]{int.class});
      PostRepository testPostRepository = (PostRepository) pCons.newInstance(1);
    });
  }
}
