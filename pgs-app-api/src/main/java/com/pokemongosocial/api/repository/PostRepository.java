package com.pokemongosocial.api.repository;

import com.pokemongosocial.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<List<Post>> findByTrainerId(Long trainerId);
    Optional<Post> findByIdAndTrainerId(Long Id, Long trainerId);

}