package com.example.ewaserver.controller;

import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.EntityRepository;
import com.example.ewaserver.resource.exception.BadInput;
import com.example.ewaserver.resource.exception.Forregistrationden;
import com.example.ewaserver.resource.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/users")
public class UserController {
  @Autowired
  private EntityRepository<User> userRepository;

  @GetMapping("")
  public MappingJacksonValue getAllUsers() {
    return new MappingJacksonValue(userRepository.findAll());
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable Long id) {
    User user = userRepository.findById(id);

    // The caller's requested user couldn't be found
    if (user == null) {
      throw new ResourceNotFound(String.format("User-Id=%d could not be found.", id));
    }

    return user;
  }

  @PostMapping("")
  public ResponseEntity<User> addUser(@RequestBody User user) {
    User addedUser = userRepository.save(user);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(addedUser.getId())
      .toUri();

    return ResponseEntity.created(location).body(addedUser);
  }

  @PostMapping("/{id}/add-points")
  public ResponseEntity<User> addPoints(@PathVariable Long id, @RequestBody int points) {
    User user = userRepository.findById(id);

    // The caller's requested user couldn't be found
    if (user == null) {
      throw new ResourceNotFound(String.format("User-Id=%d could not be found.", id));
    }

    // Don't allow negative points to be added to users
    if(points < 0){
      throw new BadInput("Points' value can't be a negative value");
    }

    user.addPoints(points);

    userRepository.save(user);

    return ResponseEntity.ok(user);
  }

  @PutMapping("/{id}")
  public User saveUser(@PathVariable Long id, @RequestBody User user) {
    if (!user.getId().equals(id)) {
      throw new Forregistrationden(String.format("User-Id=%d does not match path parameter=%d", user.getId(), id));
    }

    return userRepository.save(user);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<URI> deleteUserById(@PathVariable Long id) {
    boolean user = userRepository.deleteById(id);

    // The caller's requested user couldn't be found
    if (!user) {
      throw new ResourceNotFound(String.format("User-Id=%d could not be found.", id));
    }

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("")
      .build()
      .toUri();

    return ResponseEntity.ok(location);
  }
}
