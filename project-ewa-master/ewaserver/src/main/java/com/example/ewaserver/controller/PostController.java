package com.example.ewaserver.controller;

import com.example.ewaserver.entity.Post;
import com.example.ewaserver.repository.EntityRepository;
import com.example.ewaserver.resource.exception.Forregistrationden;
import com.example.ewaserver.resource.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/posts")
public class PostController {
  @Autowired
  private EntityRepository<Post> postRepository;

  @GetMapping("")
  public MappingJacksonValue getAllPosts() {
    return new MappingJacksonValue(postRepository.findAll());
  }

  @GetMapping("/{id}")
  public Post getPostById(@PathVariable Long id) {
    Post post = postRepository.findById(id);

    // The caller's requested post couldn't be found
    if (post == null) {
      throw new ResourceNotFound(String.format("Post-Id=%d could not be found.", id));
    }

    return post;
  }

  @PostMapping("")
  public ResponseEntity<Post> addPost(@RequestBody Post post) {
    Post addedPost = postRepository.save(post);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(addedPost.getId())
      .toUri();

    return ResponseEntity.created(location).body(addedPost);
  }

  @PutMapping("/{id}")
  public Post savePost(@PathVariable Long id, @RequestBody Post post) {
    if (!post.getId().equals(id)) {
      throw new Forregistrationden(String.format("Post-Id=%d does not match path parameter=%d", post.getId(), id));
    }

    return postRepository.save(post);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<URI> deletePostById(@PathVariable Long id) {
    boolean post = postRepository.deleteById(id);

    // The caller's requested post couldn't be found
    if (!post) {
      throw new ResourceNotFound(String.format("Post-Id=%d could not be found.", id));
    }

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("")
      .build()
      .toUri();

    return ResponseEntity.ok(location);
  }
}
