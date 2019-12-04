package com.pokemongosocial.api.controller;

import com.pokemongosocial.api.entity.Post;
import com.pokemongosocial.api.exception.ResourceNotFoundException;
import com.pokemongosocial.api.repository.PostRepository;
import com.pokemongosocial.api.repository.TrainerRepository;
import com.pokemongosocial.api.security.CurrentUser;
import com.pokemongosocial.api.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    TrainerRepository trainerRepository;

    // For PokeNews
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // For Searching Posts by Trainer Alias
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/posts/search")
    public List<Post> searchPostByAlias(@RequestParam(value = "alias") String alias) {
        return postRepository.findByTrainerAlias(alias)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "Trainer Alias", alias));
    }

    // For other user's wall posts
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers/{trainerId}/posts")
    public List<Post> getAllPostsByTrainerId(@PathVariable(value = "trainerId") Long trainerId) {
        return postRepository.findByTrainerId(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "trainerId", trainerId));
    }

    // For my wall posts
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers/me/posts")
    public List<Post> getAllMyPosts(@CurrentUser UserPrincipal currentUser) {
        return postRepository.findByTrainerId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Posts", "Alias", currentUser.getUsername()));
    }

    // For creating your new post
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/trainers/me/posts")
    public Post createPost(@CurrentUser UserPrincipal currentUser,
                           @Valid @RequestBody Post post) {
        return trainerRepository.findById(currentUser.getId()).map(trainer -> {
            post.setTrainer(trainer);
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "Alias", currentUser.getUsername()));
    }

    // For editing your old post
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/trainers/me/posts/{postId}")
    public Post updatePost(@CurrentUser UserPrincipal currentUser,
                           @PathVariable (value = "postId") Long postId,
                           @Valid @RequestBody Post postRequest) {
        return trainerRepository.findById(currentUser.getId()).map(trainer ->
                postRepository.findByIdAndTrainerId(postId,currentUser.getId()).map(post -> {
                    post.setContent(postRequest.getContent());
                    return postRepository.save(post);
                }).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId))
        ).orElseThrow(() -> new ResourceNotFoundException("Trainer", "TrainerId", currentUser.getId()));
    }

    // For deleting your old post
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/users/me/posts/{postId}")
    public ResponseEntity<?> deletePost(@CurrentUser UserPrincipal currentUser,
                                        @PathVariable (value = "postId") Long postId) {
        return trainerRepository.findById(currentUser.getId()).map(trainer ->
                postRepository.findByIdAndTrainerId(postId,currentUser.getId()).map(post -> {
                    postRepository.delete(post);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId))
        ).orElseThrow(() -> new ResourceNotFoundException("Trainer", "TrainerId", currentUser.getId()));
    }
}