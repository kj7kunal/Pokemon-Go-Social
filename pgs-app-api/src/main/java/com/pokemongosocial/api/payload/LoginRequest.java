package com.pokemongosocial.api.payload;

import javax.validation.constraints.NotBlank;


public class LoginRequest {
    @NotBlank
    private String alias;

    @NotBlank
    private String password;

    public String getAlias() {
        return alias;
    }

    public void setUsername(String username) {
        this.alias = alias;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}