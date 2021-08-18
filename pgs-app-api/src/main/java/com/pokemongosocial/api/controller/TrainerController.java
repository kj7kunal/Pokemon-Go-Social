package com.pokemongosocial.api.controller;


import com.pokemongosocial.api.entity.Trainer;
import com.pokemongosocial.api.exception.ResourceNotFoundException;
import com.pokemongosocial.api.repository.TrainerProfileRepository;
import com.pokemongosocial.api.repository.TrainerRepository;
import com.pokemongosocial.api.security.CurrentUser;
import com.pokemongosocial.api.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class TrainerController {
    @Autowired
    TrainerRepository trainerRepository;
    TrainerProfileRepository trainerProfileRepository;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers")
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers/me")
    public Trainer getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return trainerRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Trainer", "Id", currentUser.getId()));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/trainers/{trainerId}")
    public Trainer getTrainer(@PathVariable("trainerId") Long trainerId) {
        return trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer", "Id", trainerId));
    }


    private BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    // Create a new trainer

    @Transactional(rollbackFor = Exception.class)
    @PostMapping("/trainers")
    public Trainer createTrainer(@Valid @RequestBody Trainer trainer) {
        trainer.setPassword(passEncoder.encode(trainer.getPassword()));
        return trainerRepository.save(trainer);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/trainers/me}")
    public Trainer updateProfile(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody Trainer trainerEdit) {
        return trainerRepository.findById(currentUser.getId()).map(trainer -> {
            trainer.setAlias(trainerEdit.getAlias());
            trainer.setEmail(trainerEdit.getEmail());
//            trainer.setTrainerProfile(trainerEdit.getTrainerProfile());
            return trainerRepository.save(trainer);
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "Alias", currentUser.getUsername()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/trainers/{trainerId}")
    public ResponseEntity<?> deleteTrainer(@PathVariable Long trainerId) {
        return trainerRepository.findById(trainerId).map(trainer -> {
            trainerRepository.delete(trainer);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "Id", trainerId));
    }

}