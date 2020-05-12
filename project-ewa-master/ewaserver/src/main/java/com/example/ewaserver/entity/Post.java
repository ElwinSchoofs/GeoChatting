package com.example.ewaserver.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

@Entity
public class Post implements Identifiable{
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "gen_post")
  private Long id;
  private String message;
  private double latitude;
  private double longitude;
  private String attachmentPath;
  private LocalDateTime createdAt;
  private boolean isActive;
  @ManyToOne
  private User createdBy;
  @OneToMany
  private Set<Viewer> viewed;

  public Post() {
    setCreatedAt(LocalDateTime.now());
    setActive(true);
  }

  /**
   * A constructor to create a standard post.
   */
  public Post(String message, int latitude, int longitude, User createdBy) {
    this(message, latitude, longitude, createdBy, null);
  }

  /**
   * A constructor to create a post with an attachment (like an image).
   */
  public Post(String message, double latitude, double longitude, User createdBy, String attachmentPath) {
    setMessage(message);
    setLatitude(latitude);
    setLongitude(longitude);
    setAttachmentPath(attachmentPath);
    setCreatedAt(LocalDateTime.now());
    setActive(true);
    setCreatedBy(createdBy);
    setViewed(new TreeSet<>(Comparator.comparing(Viewer::getTime)));
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Post post = (Post) o;

    return id.equals(post.id);
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public double getLatitude() {
    return latitude;
  }

  public void setLatitude(double latitude) {
    this.latitude = latitude;
  }

  public double getLongitude() {
    return longitude;
  }

  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }

  public String getAttachmentPath() {
    return attachmentPath;
  }

  public void setAttachmentPath(String attachmentPath) {
    this.attachmentPath = attachmentPath;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public boolean isActive() {
    return isActive;
  }

  public void setActive(boolean active) {
    isActive = active;
  }

  public User getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(User createdBy) {
    this.createdBy = createdBy;
  }

  public Set<Viewer> getViewed() {
    return viewed;
  }

  public void setViewed(Set<Viewer> viewed) {
    this.viewed = viewed;
  }
}
