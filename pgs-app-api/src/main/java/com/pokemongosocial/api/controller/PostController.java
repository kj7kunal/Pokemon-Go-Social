package com.pokemongosocial.api.controller;

import com.pokemongosocial.api.entity.Post;
import com.pokemongosocial.api.exception.ResourceNotFoundException;
import com.pokemongosocial.api.payload.ApiResponse;
import com.pokemongosocial.api.payload.PostResponse;
import com.pokemongosocial.api.repository.PostRepository;
import com.pokemongosocial.api.repository.TrainerRepository;
import com.pokemongosocial.api.security.CurrentUser;
import com.pokemongosocial.api.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    TrainerRepository trainerRepository;

    private List<PostResponse> getPostResponses(List<Post> postList){
        return postList.stream().map(post -> {
            PostResponse postResponse = new PostResponse();
            postResponse.setId(post.getId());
            postResponse.setContent(post.getContent());
            postResponse.setCreatedBy((post.getTrainer().getAlias()));
            postResponse.setUpdatedAt(post.getUpdatedAt());
            return postResponse;
        }).collect(Collectors.toList());
    }

    // For PokeNews
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/posts")
    public List<PostResponse> getAllPosts() {
        return getPostResponses(postRepository.findAll());
    }

    // For Searching Posts by Trainer Alias
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/posts/search")
    public List<PostResponse> searchPostByAlias(@RequestParam(value = "alias") String alias) {
        return getPostResponses(postRepository.findByTrainerAliasContaining(alias)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "Trainer Alias", alias)));
    }

    // For other user's wall posts
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers/{trainerId}/posts")
    public List<PostResponse> getAllPostsByTrainerId(@PathVariable(value = "trainerId") Long trainerId) {
        return getPostResponses(postRepository.findByTrainerId(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "trainerId", trainerId)));
    }

    // For my wall posts
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers/me/posts")
    public List<PostResponse> getAllMyPosts(@CurrentUser UserPrincipal currentUser) {
        return getPostResponses(postRepository.findByTrainerId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Posts", "Alias", currentUser.getUsername())));
    }

    // For creating your new post
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/trainers/me/posts")
    public ResponseEntity<?> createPost(@CurrentUser UserPrincipal currentUser,
                           @Valid @RequestBody Post post) {
        Post createdPost = trainerRepository.findById(currentUser.getId()).map(trainer -> {
            post.setTrainer(trainer);
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "Alias", currentUser.getUsername()));

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/trainers/me/posts/{id}")
                .buildAndExpand(createdPost.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Post Created Successfully"));
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