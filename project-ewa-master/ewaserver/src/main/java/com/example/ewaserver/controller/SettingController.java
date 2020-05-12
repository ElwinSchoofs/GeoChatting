package com.example.ewaserver.controller;

import com.example.ewaserver.entity.Post;
import com.example.ewaserver.entity.Setting;
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
@RequestMapping("/settings")
public class SettingController {
  @Autowired
  private EntityRepository<Setting> settingRepository;

  @GetMapping("")
  public MappingJacksonValue getAllSettings() {
    return new MappingJacksonValue(settingRepository.findAll());
  }

  @GetMapping("/{id}")
  public Setting getSettingById(@PathVariable Long id) {
    Setting setting = settingRepository.findById(id);

    // The caller's requested post couldn't be found
    if (setting == null) {
      throw new ResourceNotFound(String.format("Post-Id=%d could not be found.", id));
    }

    return setting;
  }

  @PostMapping("")
  public ResponseEntity<Setting> addSetting(@RequestBody Setting setting) {
    Setting addedSetting = settingRepository.save(setting);

    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(addedSetting.getId())
      .toUri();

    return ResponseEntity.created(location).body(addedSetting);
  }

  @PutMapping("/{id}")
  public Setting saveSetting(@PathVariable Long id, @RequestBody Setting setting) {
    if (!setting.getId().equals(id)) {
      throw new Forregistrationden(String.format("Post-Id=%d does not match path parameter=%d", setting.getId(), id));
    }

    return settingRepository.save(setting);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<URI> deleteSettingById(@PathVariable Long id) {
    boolean setting = settingRepository.deleteById(id);

    // The caller's requested post couldn't be found
    if (!setting) {
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
