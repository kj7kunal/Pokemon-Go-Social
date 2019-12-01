package com.pokemongosocial.api.security;

import com.pokemongosocial.api.entity.Trainer;
import com.pokemongosocial.api.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class LoginUserDetailsService implements UserDetailsService {

    @Autowired
    TrainerRepository trainerRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String alias) throws UsernameNotFoundException {
        Trainer trainer = trainerRepository.findByAlias(alias)
                .orElseThrow(() -> new UsernameNotFoundException("Trainer: " + alias + " Not Found"));
        return UserPrincipal.create(trainer);
    }
}