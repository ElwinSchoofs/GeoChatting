package com.example.ewaserver.repository;


import com.example.ewaserver.entity.Setting;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Primary
@Repository
@Transactional
public class SettingsRepository extends AbstractEntityRepository<Setting> {

  public SettingsRepository() {
    super(Setting.class);
  }
}
