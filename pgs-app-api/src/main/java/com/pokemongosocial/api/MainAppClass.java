package com.pokemongosocial.api;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@SpringBootApplication()
@EnableJpaAuditing
@EntityScan(basePackageClasses = {
        MainAppClass.class,
        Jsr310JpaConverters.class
})
public class MainAppClass {
    public static void main(String[] args) {
        SpringApplication.run(MainAppClass.class, args);
    }

    @PostConstruct
    public void init() {
        // Setting Spring Boot SetTimeZone
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

}