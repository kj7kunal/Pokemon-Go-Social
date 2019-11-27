package com.pokemongosocial.api.controller;


import com.pokemongosocial.api.entity.Trainer;
import com.pokemongosocial.api.exception.ResourceNotFoundException;
import com.pokemongosocial.api.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class TrainerController {
    @Autowired
    TrainerRepository trainerRepository;

    @GetMapping("/trainers")
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    @GetMapping("/trainers/{trainerID}")
    public Trainer getTrainer(@PathVariable("trainerID") String trainerID) {
        return trainerRepository.findByTrainerID(trainerID)
                .orElseThrow(() -> new ResourceNotFoundException("Trainer", "ID", trainerID));
    }

    private BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    // Create a new trainer
    @PostMapping("/trainers")
    public Trainer createTrainer(@Valid @RequestBody Trainer trainer) {
        trainer.setPassword("{kaias}" + passEncoder.encode(trainer.getPassword()));
        return trainerRepository.save(trainer);
    }

    @PutMapping("/trainers/{trainerID}")
    public Trainer updateTrainer(@PathVariable String trainerID, @Valid @RequestBody Trainer trainerDetails) {
        return trainerRepository.findByTrainerID(trainerID).map(trainer -> {
            trainer.setEmailID(trainerDetails.getEmailID());
            return trainerRepository.save(trainer);
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "ID", trainerID));
    }

    @DeleteMapping("/trainers/{trainerID}")
    public ResponseEntity<?> deleteTrainer(@PathVariable String trainerID) {
        return trainerRepository.findByTrainerID(trainerID).map(trainer -> {
            trainerRepository.delete(trainer);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Trainer", "ID", trainerID));
    }

}