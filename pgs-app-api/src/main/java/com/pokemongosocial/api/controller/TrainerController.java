package com.pokemongosocial.api.controller;


import com.pokemongosocial.api.entity.Trainer;
import com.pokemongosocial.api.entity.TrainerProfile;
import com.pokemongosocial.api.exception.ResourceNotFoundException;
import com.pokemongosocial.api.repository.TrainerProfileRepository;
import com.pokemongosocial.api.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/trainers")
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

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
        System.out.println(trainer);
        trainer.setPassword("{kaias}" + passEncoder.encode(trainer.getPassword()));
        return trainerRepository.save(trainer);
    }

    @PutMapping("/trainers/{trainerId}")
    public Trainer updateTrainer(@PathVariable Long trainerId, @Valid @RequestBody Trainer trainerDetails) {
        return trainerRepository.findById(trainerId).map(trainer -> {
            trainer.setAlias(trainerDetails.getAlias());
            trainer.setEmailId(trainerDetails.getEmailId());
//            trainer.setTrainerProfile(trainerDetails.getTrainerProfile());
            return trainerRepository.save(trainer);
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "Id", trainerId));
    }

    @DeleteMapping("/trainers/{trainerId}")
    public ResponseEntity<?> deleteTrainer(@PathVariable Long trainerId) {
        return trainerRepository.findById(trainerId).map(trainer -> {
            trainerRepository.delete(trainer);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "Id", trainerId));
    }

}