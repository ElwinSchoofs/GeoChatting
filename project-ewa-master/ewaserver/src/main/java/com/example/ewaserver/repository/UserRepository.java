package com.example.ewaserver.repository;

import com.example.ewaserver.entity.User;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Primary
@Repository
@Transactional
public class UserRepository extends AbstractEntityRepository<User> {
  public UserRepository() {
    super(User.class);
  }
}
