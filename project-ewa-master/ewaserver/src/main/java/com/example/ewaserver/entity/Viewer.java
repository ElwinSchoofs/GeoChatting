package com.example.ewaserver.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NamedQuery(name = "find_all_viewer", query = "select v from Viewer v")
public class Viewer {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "gen_viewer")
  private Long id;
  private LocalDateTime time;
  @ManyToOne
  private User viewedBy;
  @ManyToOne
  private Post viewedPost;

  public Viewer() {
  }

  public Viewer(User viewedBy, Post viewedPost) {
    this.time = LocalDateTime.now();
    this.viewedBy = viewedBy;
    this.viewedPost = viewedPost;
  }

  public LocalDateTime getTime() {
    return time;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
  }

  public User getViewedBy() {
    return viewedBy;
  }

  public void setViewedBy(User viewedBy) {
    this.viewedBy = viewedBy;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Post getViewedPost() {
    return viewedPost;
  }

  public void setViewedPost(Post viewedPost) {
    this.viewedPost = viewedPost;
  }
}
