package com.pokemongosocial.api.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class AppController {

    @RequestMapping("/")
    public String index() {
        return "Congratulations from AppController.java";
    }

}