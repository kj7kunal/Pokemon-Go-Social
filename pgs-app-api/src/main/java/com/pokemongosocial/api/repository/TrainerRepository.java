package com.pokemongosocial.api.repository;

import com.pokemongosocial.api.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByAlias(String alias);
    Boolean existsByAlias(String alias);
    Boolean existsByEmailId(String emailId);
}