package com.example.ewaserver.Kerim;

import com.example.ewaserver.entity.Post;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.PostRepository;
import com.example.ewaserver.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * @author Kerim Karaer 500800038
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PostControllerTest {
  private User user;
  private Post post;
  private final String POST_MESSAGE = "Lorem ipsum.";

  @Autowired
  TestRestTemplate testRestTemplate;
  @Autowired
  PostRepository postRepository;
  @Autowired
  UserRepository userRepository;

  @BeforeEach
  public void setup() {
    user = new User("unit@test.com", "unit_test_password", "Unit Tester");
    post = new Post(POST_MESSAGE, 52, 5, user);

    userRepository.save(user);
    postRepository.save(post);
  }

  @AfterEach
  public void after() {
    postRepository.deleteById(post.getId());
    userRepository.deleteById(user.getId());
  }

  @Test
  public void idNotEqualToSavingPost() {
    // Change the original post
    post.setMessage("Dolor sit");

    // Try to pass the updated original post while passing the wrong id in the URL
    this.testRestTemplate.put("/posts/" + post.getId() + 99999, post);

    // Check if application denied to save changes by comparing the post to its original messages
    assertEquals(POST_MESSAGE, postRepository.findById(post.getId()).getMessage());
  }
}

