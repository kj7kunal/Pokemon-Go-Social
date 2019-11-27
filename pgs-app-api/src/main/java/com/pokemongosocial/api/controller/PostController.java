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
import java.util.Optional;

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
    public List<Post> getAllPostsByUserId(@PathVariable (value = "trainerId") String trainerId) {
        return postRepository.findAllByPosterId(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "trainerId", trainerId));
    }

    @PostMapping("/trainers/{trainerId}/posts")
    public Post createPost(@PathVariable(value = "trainerId") String trainerId,
                           @Valid @RequestBody Post post) {
        post.setPosterId(trainerId);
        return postRepository.save(post);
    }

    @PutMapping("/trainers/{trainerId}/posts/{postId}")
    public Post updatePost(@PathVariable (value = "trainerId") String trainerId,
                           @PathVariable (value = "postId") Long postId,
                           @Valid @RequestBody Post postRequest) {
        // TODO: Add check for trainerId existence
        return postRepository.findById(postId).map(post -> {
            post.setContent(postRequest.getContent());
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
    }

    @DeleteMapping("/users/{trainerId}/posts/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable (value = "trainerId") String trainerId,
                                        @PathVariable (value = "postId") Long postId) {
        // TODO: Add check for trainerId existence
        return postRepository.findById(postId).map(post -> {
            postRepository.delete(post);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
    }

}