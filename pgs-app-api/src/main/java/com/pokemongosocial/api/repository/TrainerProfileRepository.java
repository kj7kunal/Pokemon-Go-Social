package com.pokemongosocial.api.repository;

import com.pokemongosocial.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TrainerProfileRepository extends JpaRepository<Post, Long> {
}