package com.example.ewaserver.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class User implements Identifiable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "gen_user")
  private Long id;
  private String email;
//  @JsonIgnore
  private String password;
  private String nickname;
  private boolean isAdmin;
  private Long totalPoints;
  private boolean isActive;

  public User() {
  }

  /**
   * A constructor to create a standard user.
   */
  public User(String email, String password, String nickname) {
    this(email, password, nickname, false);
  }

  /**
   * A constructor which can be used to create an admin
   */
  public User(String email, String password, String nickname, boolean isAdmin) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.isAdmin = isAdmin;
    totalPoints = 0L;
    isActive = true;
  }

  /**
   * Users are equal to each other if their role and email address are exactly the same.
   * So an admin account is not equal to an user account even though their email addresses
   * are equal to each other.
   */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    User user = (User) o;

    if (isAdmin != user.isAdmin) return false;
    return email.equals(user.email);
  }


  @Override
  public int hashCode() {
    int result = email.hashCode();
    result = 31 * result + (isAdmin ? 1 : 0);
    return result;
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  @JsonProperty("isAdmin")
  public boolean isAdmin() {
    return isAdmin;
  }

  @JsonProperty("isAdmin")
  public void setIsAdmin(boolean admin) {
    isAdmin = admin;
  }

  public Long getTotalPoints() {
    return totalPoints;
  }

  public void setTotalPoints(Long totalPoints) {
    this.totalPoints = totalPoints;
  }

  @JsonProperty("isActive")
  public boolean isActive() {
    return isActive;
  }

  @JsonProperty("isActive")
  public void setIsActive(boolean active) {
    isActive = active;
  }

  public void addPoints(int addPoints) {
    totalPoints += addPoints;
  }
}
