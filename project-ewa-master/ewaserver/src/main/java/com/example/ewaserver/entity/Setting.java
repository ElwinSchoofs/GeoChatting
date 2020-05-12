package com.example.ewaserver.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
//@Table(name = "setting")
public class Setting implements Identifiable {
  @Id
  @NotNull
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "gen_settings")
  @Column(name = "setting_id")
  private long id;
  @Column(name="content")
  private long content;
  @Column(name="name")
  private String name;

  public Setting(){
  }


  public Setting(long content, long id, String name){
    this.id = id;
    this.content = content;
    this.name = name;
  }


  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  public long getContent() {
    return content;
  }

  public void setContent(long content) {
    this.content = content;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

