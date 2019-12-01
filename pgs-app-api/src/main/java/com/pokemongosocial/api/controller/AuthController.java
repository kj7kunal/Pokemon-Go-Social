package com.pokemongosocial.api.controller;

import com.pokemongosocial.api.entity.Role;
import com.pokemongosocial.api.entity.RoleName;
import com.pokemongosocial.api.entity.Trainer;
import com.pokemongosocial.api.exception.AppException;
import com.pokemongosocial.api.payload.ApiResponse;
import com.pokemongosocial.api.payload.JwtAuthenticationResponse;
import com.pokemongosocial.api.payload.LoginRequest;
import com.pokemongosocial.api.payload.SignUpRequest;
import com.pokemongosocial.api.repository.RoleRepository;
import com.pokemongosocial.api.repository.TrainerRepository;
import com.pokemongosocial.api.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TrainerRepository trainerRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getAlias(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    private BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    @SuppressWarnings("unchecked")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (trainerRepository.existsByAlias(signUpRequest.getAlias())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (trainerRepository.existsByEmailId(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Trainer trainer = new Trainer(signUpRequest.getAlias(),
                signUpRequest.getEmail(), signUpRequest.getPassword());
//                signUpRequest.getGender(), signUpRequest.getDob(), signUpRequest.getTeam());

        Role role = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set"));

        trainer.setRoles(Collections.singleton(role));

        trainer.setPassword(passEncoder.encode(trainer.getPassword()));

        Trainer result = trainerRepository.save(trainer);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/trainers/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}