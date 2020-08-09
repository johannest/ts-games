package org.vaadin.johannest.backend;

import java.util.*;
import java.util.stream.Collectors;

public class GameData {

    private String gameName;
    private List<HighScore> highScores = new ArrayList<>();

    public GameData() {
    }

    public GameData(String gameName) {
        this.gameName = gameName;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public List<HighScore> getHighScores() {
        return highScores;
    }

    public void setHighScores(List<HighScore> highScores) {
        this.highScores = highScores;
    }

    public void addScore(HighScore highScore) {
        highScores.add(highScore);
        highScores = highScores.stream().sorted(Comparator.comparingInt(HighScore::getScore)).collect(Collectors.toList());
    }
}

