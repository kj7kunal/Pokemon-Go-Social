package com.pokemongosocial.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "trainer_cred")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
@SequenceGenerator(name="trainerSeq", initialValue=1000001)
public class Trainer implements Serializable {

    // Hibernate Search needs to store the entity identifier in the index for
    // each entity. By default, it will use for this purpose the field marked
    // with Id.
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "trainerSeq")
    private Long id;

    @NotNull
    @Size(min = 3, max = 30)
    private String alias;

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

//    @OneToMany(mappedBy = "trainer")
//    private List<Post> posts = new ArrayList<Post>();

    public Trainer() {}

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
}