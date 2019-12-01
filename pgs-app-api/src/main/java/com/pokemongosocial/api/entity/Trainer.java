package com.pokemongosocial.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "trainer_cred")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
@SequenceGenerator(name = "trainerSeq", initialValue = 1000001)
public class Trainer implements Serializable {

    // Hibernate Search needs to store the entity identifier in the index for
    // each entity. By default, it will use for this purpose the field marked
    // with Id.
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trainerSeq")
    @Column(name = "id")
    private Long id;

    @Size(min = 3, max = 30)
    @Column(unique = true, nullable = false)
    private String alias;

    @NotNull
    private String password;

    @Email
    @Column(unique = true, nullable = false, updatable = false)
    private String emailId;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

//    @OneToMany(mappedBy = "trainer")
//    private List<Post> posts = new ArrayList<Post>();

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "trainer", fetch = FetchType.LAZY)
    @JsonManagedReference
    private TrainerProfile trainerProfile;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JoinTable(name = "trainer_roles",
            joinColumns = @JoinColumn(name = "trainer_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    public Trainer() {
    }

    public Trainer(String alias, String email, String password) {
        this.alias = alias;
        this.emailId = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
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

    public TrainerProfile getTrainerProfile() {
        return trainerProfile;
    }

    public void setTrainerProfile(TrainerProfile trainerProfile) {
        if (trainerProfile == null) {
            if (this.trainerProfile != null) {
                this.trainerProfile.setTrainer(null);
            }
        } else {
            trainerProfile.setTrainer(this);
        }
        this.trainerProfile = trainerProfile;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}