package com.example.ewaserver.Luuk;

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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Luuk Wagenaar 500799908
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PostControllerTest {

  private final String POST_MESSAGE = "Lorem ipsum.";

  private User user;
  private Post post;
  private User testuser;

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
    user = new User("user@test.com", "password123", "Tester");
    userRepository.save(user);
    post = new Post("Test post", 123, 12, user);
    postRepository.save(post);
  }

  @AfterEach
  public void after() {
    postRepository.deleteById(post.getId());
    userRepository.deleteById(user.getId());
  }

  @Test
  public void deletesExistingPostEqualToId() {
    // add a new post to only delete it
    Post tempPost = new Post();
    postRepository.save(tempPost);

    // Check id generation
    assertTrue(tempPost.getId() > 0);
    // Check post is saved
    assertNotNull(postRepository.findById(tempPost.getId()));
    // Make sure the object is just like a normal post
    assertEquals("Test post", post.getMessage());
   assertEquals(123, post.getLatitude());
   assertEquals(12, post.getLongitude());
   assertEquals(user, post.getCreatedBy());
    // Delete post
    this.testRestTemplate.delete("/posts/{id}", tempPost.getId());
    assertNull(postRepository.findById(tempPost.getId()));
  }

  @Test
  public void ifAllDataIsValidDeletePost() {
    Post deletingPost = new Post("Test post to delete", 42, 54, user);
    postRepository.save(deletingPost);
    assertTrue(deletingPost.getId() > 0);
    assertNotNull(postRepository.findById(deletingPost.getId()));
    this.testRestTemplate.delete("/posts/{id}", deletingPost.getId());

    assertNull(postRepository.findById(deletingPost.getId()));
  }

  @Test
  public void ifIdNotEqualToUserIdPreventDelete() {
    long fakeId = post.getId() + 123456;
    this.testRestTemplate.delete("/posts/{id}", fakeId);
    assertEquals(
      postRepository.findById(post.getId()),
      post
    );
  }

  @Test
  public void ifPathVariableIsEmptyPreventDelete() {
    this.testRestTemplate.delete("/posts/{id}", "");
    assertEquals(
      new MappingJacksonValue(postRepository.findAll()).getValue(),
      postController.getAllPosts().getValue()
    );
  }

  @Test
  public void checkHttpResponseForPost(){
    int PostsToAdd = 10;
    Post tempPost = new Post();
    postRepository.save(tempPost);
    // Make sure the post is properly set up
    assertTrue(tempPost.getId() > 0);
    assertNotNull(postRepository.findById(tempPost.getId()));
    tempPost = postRepository.findById(tempPost.getId());
        String url = "/postss/" + tempPost.getId() + "/add-posts";
    HttpEntity<Integer> request = new HttpEntity<>(PostsToAdd);
    ResponseEntity<Post> response = this.testRestTemplate.postForEntity(url, request, Post.class);
    assertThat(HttpStatus.OK.equals(response.getStatusCode()));
    Post responsePost = response.getBody();
    assertNotNull(responsePost);
  }
}

