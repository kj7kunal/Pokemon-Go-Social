package com.pokemongosocial.api.payload;

import com.pokemongosocial.api.entity.Gender;
import com.pokemongosocial.api.entity.Team;

import javax.validation.constraints.*;
import java.time.LocalDate;

public class SignUpRequest {
    @NotBlank
    @Size(min = 3, max = 30)
    private String alias;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

//    private LocalDate dob;
//
//    private Team team;
//
//    private Gender gender;

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public LocalDate getDob() {
//        return dob;
//    }
//
//    public void setDob(LocalDate dob) {
//        this.dob = dob;
//    }
//
//    public Gender getGender() {
//        return gender;
//    }
//
//    public void setGender(Gender gender) {
//        this.gender = gender;
//    }
//
//    public Team getTeam() {
//        return team;
//    }
//
//    public void setTeam(Team team) {
//        this.team = team;
//    }
}