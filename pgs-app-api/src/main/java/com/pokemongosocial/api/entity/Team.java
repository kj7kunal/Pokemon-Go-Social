package com.pokemongosocial.api.entity;

public enum Team {
    INSTINCT("Instinct", "Yellow"),
    VALOR("Valor", "Red"),
    MYSTIC("Mystic", "Blue");

    private final String teamName;
    private final String teamColor;

    private Team(String teamName, String teamColor) {
        this.teamColor = teamColor;
        this.teamName = teamName;
    }

    public String getTeamName() {
        return teamName;
    }
    public String getTeamColor() {
        return teamColor;
    }
}