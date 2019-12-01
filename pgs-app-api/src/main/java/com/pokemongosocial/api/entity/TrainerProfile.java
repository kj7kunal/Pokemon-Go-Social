package com.pokemongosocial.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "trainer_profile")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"updatedAt"},allowGetters = true)
public class TrainerProfile implements Serializable {
    @Id
    @Column(name = "id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Trainer trainer;

    @Lob
    private String bio;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dob;

//    TODO: @Lob      //AVATAR IMAGE
//    private byte[] avatar;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition="varchar(10) default 'MALE'",
            updatable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition="varchar(30) default 'MYSTIC'",
            updatable = false)
    private Team team;

    @Size(max = 40)
    private String buddyName;

    private Long numOfPokemon;
    private Long distanceWalked;
    private Long numOfBattles;
    private Integer trainerLevel;
    private Long xp;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    public TrainerProfile() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public String getBio() { return bio; }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

//    TODO: Define avatar
//    public byte[] getAvatar() {
//        return this.avatar;
//    }
//
//    public void setAvatar(byte[] avatar) {
//        this.avatar = avatar;
//    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getBuddyName() { return buddyName; }

    public void setBuddyName(String buddyName) {
        this.buddyName = buddyName;
    }

    public Long getNumOfPokemon() {
        return numOfPokemon;
    }

    public void setNumOfPokemon(Long numOfPokemon) {
        this.numOfPokemon = numOfPokemon;
    }

    public Long getDistanceWalked() {
        return distanceWalked;
    }

    public void setDistanceWalked(Long distanceWalked) {
        this.distanceWalked = distanceWalked;
    }

    public Long getNumOfBattles() {
        return numOfBattles;
    }

    public void setNumOfBattles(Long numOfBattles) {
        this.numOfBattles = numOfBattles;
    }

    public Integer getTrainerLevel() {
        return trainerLevel;
    }

    public void setTrainerLevel(Integer trainerLevel) {
        this.trainerLevel = trainerLevel;
    }

    public Long getXp() {
        return xp;
    }

    public void setXp(Long xp) {
        this.xp = xp;
    }


    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

}