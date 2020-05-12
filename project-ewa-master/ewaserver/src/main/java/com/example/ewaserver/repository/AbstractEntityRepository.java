package com.example.ewaserver.repository;


import com.example.ewaserver.entity.Identifiable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class AbstractEntityRepository<E extends Identifiable> implements EntityRepository<E> {
  @PersistenceContext
  protected EntityManager entityManager;

  private Class<E> entityClass;

  public AbstractEntityRepository(Class<E> entityClass) {
    this.entityClass = entityClass;
    System.out.println(String.format("Created %s <%s>", this.getClass().getName(), this.entityClass.getSimpleName()));
  }

  /**
   * Finds all entries of given Entity.
   *
   * @return A list of entries of given entity
   */
  @Override

  public List<E> findAll() {
    TypedQuery<E> query = entityManager.createQuery("select e from " + entityClass.getSimpleName() + " e", entityClass);
    return query.getResultList();
  }

  /**
   * Finds an entry of entity by looking at its id.
   *
   * @param id The id that's connected to a specific entry of entity
   * @return Returns an entry of entity if matches to the parameter's values
   */
  @Override
  public E findById(Long id) {
    return entityManager.find(entityClass, id);
  }

  /**
   * Saves a new entry of entity if given data doesn't contain an id. If it does,
   * it updates an existing entry of entity.
   *
   * @param entity The entry of entity to be saved
   * @return The updated entry of entity
   */
  @Override
  public E save(E entity) {
    if (entity.getId() == null) {
      entityManager.persist(entity);
    } else {
      entityManager.merge(entity);
    }

    return entity;
  }

  /**
   * Deletes an entry of entity by searching for its id.
   *
   * @param id The id of the entry that needs to be deleted
   * @return An indication of whether or not a specific entry has been deleted
   */
  @Override
  public boolean deleteById(Long id) {
    E entity = findById(id);
    entityManager.remove(entity);

    return (entity != null && findById(id) == null);
  }
}
