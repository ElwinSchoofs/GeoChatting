package com.example.ewaserver.Sarah;

import com.example.ewaserver.EwaServerApplication;
import com.example.ewaserver.entity.Setting;
import com.example.ewaserver.repository.SettingsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.lang.reflect.Constructor;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Sarah Rehman 500798305
 */

@SpringBootTest(classes = EwaServerApplication.class)
class SettingsRepositoryTest {

  private Setting setting;

  @Autowired
  SettingsRepository settingsRepository;

  @BeforeEach
  public void setup() {
    setting = new Setting(20, 2, "testName");
  }

  @Test
  public void createSettingRepoWithWrongMethod() throws NoSuchMethodException {
    assertThrows(NoSuchMethodException.class ,() -> {
      Class sClass = SettingsRepository.class;
      Constructor sCons = sClass.getConstructor(new Class[]{int.class});
      SettingsRepository settingsRepository = (SettingsRepository)sCons.newInstance(1);
    });
  }


}
