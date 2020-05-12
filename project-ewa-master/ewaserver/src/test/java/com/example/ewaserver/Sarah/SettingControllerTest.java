package com.example.ewaserver.Sarah;

import com.example.ewaserver.controller.SettingController;
import com.example.ewaserver.entity.Post;
import com.example.ewaserver.entity.Setting;
import com.example.ewaserver.entity.User;
import com.example.ewaserver.repository.SettingsRepository;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.lang.reflect.Constructor;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Sarah Rehman 500798305
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SettingControllerTest {

  private Setting setting;

  @Autowired
  TestRestTemplate testRestTemplate;
  @Autowired
  SettingsRepository settingsRepository;
  @Autowired
  SettingController settingController;


  @BeforeEach
  void setup() {
    setting = new Setting(20, 2, "testPoints");
    settingsRepository.save(setting);
  }

  @Test
  public void requestSettingsFromEndPoint() {
    Assert.assertThat(this.testRestTemplate.getForObject("/settings/", String.class), containsString("20"));
    Assert.assertThat(this.testRestTemplate.getForObject("/settings/", String.class), containsString("2"));
    Assert.assertThat(this.testRestTemplate.getForObject("/settings/", String.class), containsString("testPoints"));
  }

  @Test
  void requestDeleteSettingFromEndPoint() {
    Setting setting = new Setting(20, 2, "testSetting");
    this.setting.setId(setting.getId());
    this.testRestTemplate.delete("/settings/" + this.setting.getId());
  }


  @Test
  public void saveSettingWithWrongParametersThrowsException() throws NoSuchMethodException {
    assertThrows(NoSuchMethodException.class, () -> {
      Class sClass = Setting.class;
      Constructor sCons = sClass.getConstructor(new Class[]{int.class});
      Setting testSetting = (Setting) sCons.newInstance(1);
    });
  }


}
