package com.example.ewaserver.Niels;

import com.example.ewaserver.controller.PostController;
import com.example.ewaserver.entity.Post;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.PostRepository;
import com.example.ewaserver.repository.UserRepository;
import com.example.ewaserver.resource.exception.ResourceNotFound;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Niels Bierman 500801926
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PostControllerTest {

  private User user;
  private Post post;

  @Autowired
  TestRestTemplate testRestTemplate;
  @Autowired
  PostRepository postRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  PostController postController;

  @BeforeEach
  public void setup() {
    user = new User("testMail@mail.com", "testWachtwoord", "testNickname");
    userRepository.save(user);
    post = new Post("Dit is een test", 500, 400, user);
    postRepository.save(post);
  }

  @AfterEach
  public void deleteAfter() {
    postRepository.deleteById(post.getId());
    userRepository.deleteById(user.getId());
  }

  @Test
  public void requestAllPostsFromEndPoint() {
    Assert.assertThat(this.testRestTemplate.getForObject("/posts", String.class), containsString("Dit is een test"));
    Assert.assertThat(this.testRestTemplate.getForObject("/posts", String.class), containsString("500"));
    Assert.assertThat(this.testRestTemplate.getForObject("/posts", String.class), containsString("400"));
  }

  @Test
  public void requestAllPostsFromController() {
    assertEquals(new MappingJacksonValue(postRepository.findAll()).getValue(), this.postController.getAllPosts().getValue());
  }

  @Test
  void requestPostPostFromEndPoint() {
    ResponseEntity<Post> response = this.testRestTemplate.postForEntity("/posts/", post, Post.class);
    assertThat(HttpStatus.CREATED.equals(response.getStatusCode()));
  }

  @Test
  void requestPutPostFromEndPoint() {
    Post putPost = new Post("Dit is een put Test", 500, 400, user);
    putPost.setId(post.getId());
    this.testRestTemplate.put("/posts/" + post.getId(), putPost);
    Assert.assertEquals(postRepository.findById(post.getId()).getMessage(), ("Dit is een put Test"));
    Assert.assertEquals(postRepository.findById(post.getId()).getMessage(), ("Dit is een put Test"));
  }

  @Test
  public void requestUserWithWrongIdThrowsException() throws ResourceNotFound {
    assertThrows(ResourceNotFound.class, () ->
      postController.getPostById(-5L)
    );
  }
}

