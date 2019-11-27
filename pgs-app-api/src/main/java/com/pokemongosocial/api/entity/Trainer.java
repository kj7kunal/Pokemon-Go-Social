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
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Trainer {

    // Hibernate Search needs to store the entity identifier in the index for
    // each entity. By default, it will use for this purpose the field marked
    // with Id.
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String trainerId;

    @NotNull
    private String password;

    @NotNull
    @Email
    @Column(unique = true)
    private String emailId;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

//    public Trainer() {}
//
//    public Trainer(String trainerId, String password) {
//        this.trainerId = trainerId;
//        this.password = password;
//    }
//
//    public Trainer(String trainerId, String password, String emailId) {
//        this.trainerId = trainerId;
//        this.password = password;
//        this.emailId = emailId;
//    }

    public Long getId() {
        return id;
    }

    public String getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(String trainerId) {
        this.trainerId = trainerId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}