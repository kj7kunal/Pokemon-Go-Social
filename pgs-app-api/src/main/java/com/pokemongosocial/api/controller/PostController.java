package com.pokemongosocial.api.controller;

import com.pokemongosocial.api.entity.Post;
import com.pokemongosocial.api.exception.ResourceNotFoundException;
import com.pokemongosocial.api.repository.PostRepository;
import com.pokemongosocial.api.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    TrainerRepository trainerRepository;

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/trainers/{trainerId}/posts")
    public List<Post> getAllPostsByTrainerId(@PathVariable(value = "trainerId") Long trainerId) {
        return postRepository.findByTrainerId(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "trainerId", trainerId));
    }

    @PostMapping("/trainers/{trainerId}/posts")
    public Post createPost(@PathVariable(value = "trainerId") Long trainerId,
                           @Valid @RequestBody Post post) {
        return trainerRepository.findById(trainerId).map(trainer -> {
            post.setTrainer(trainer);
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "TrainerId", trainerId));
    }

    @PutMapping("/trainers/{trainerId}/posts/{postId}")
    public Post updatePost(@PathVariable (value = "trainerId") Long trainerId,
                           @PathVariable (value = "postId") Long postId,
                           @Valid @RequestBody Post postRequest) {
        return trainerRepository.findById(trainerId).map(trainer ->
                postRepository.findByIdAndTrainerId(postId,trainerId).map(post -> {
                    post.setContent(postRequest.getContent());
                    return postRepository.save(post);
                }).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId))
        ).orElseThrow(() -> new ResourceNotFoundException("Trainer", "TrainerId", trainerId));
    }

    @DeleteMapping("/users/{trainerId}/posts/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable (value = "trainerId") Long trainerId,
                                        @PathVariable (value = "postId") Long postId) {
        return trainerRepository.findById(trainerId).map(trainer ->
                postRepository.findByIdAndTrainerId(postId,trainerId).map(post -> {
                    postRepository.delete(post);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId))
        ).orElseThrow(() -> new ResourceNotFoundException("Trainer", "TrainerId", trainerId));
    }
}