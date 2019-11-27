package com.pokemongosocial.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "trainer_cred")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class Trainer {

    // Hibernate Search needs to store the entity identifier in the index for
    // each entity. By default, it will use for this purpose the field marked
    // with Id.
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(unique = true)
    private String trainerID;
    @NotNull
    private String password;

    @NotNull
    @Email
    @Column(unique = true)
    private String emailID;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

//    public Trainer() {}
//
//    public Trainer(String trainerID, String password) {
//        this.trainerID = trainerID;
//        this.password = password;
//    }
//
//    public Trainer(String trainerID, String password, String emailID) {
//        this.trainerID = trainerID;
//        this.password = password;
//        this.emailID = emailID;
//    }

    public Long getId() {
        return id;
    }

    public String getTrainerID() {
        return trainerID;
    }

    public void setTrainerID(String trainerID) {
        this.trainerID = trainerID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailID() {
        return emailID;
    }

    public void setEmailID(String emailID) {
        this.emailID = emailID;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}