package com.example.ewaserver.repository;

import com.example.ewaserver.entity.Identifiable;

import java.util.List;

public interface EntityRepository<E extends Identifiable> {
  /**
   * Finds all available instances
   */
  List<E> findAll();

  /**
   * Finds one instance identified by id. Returns null if the instance does not exists.
   */
  E findById(Long id);

  /**
   * Updates or creates the instance matching matching entity.getId(). Generates a new
   * unique Id if entity.getId()==0
   */
  E save(E entity);

  /**
   * Deletes the instance identified by the entity.getId(). Returns whether
   * an existing instance has been deleted
   */
  boolean deleteById(Long id);

}
