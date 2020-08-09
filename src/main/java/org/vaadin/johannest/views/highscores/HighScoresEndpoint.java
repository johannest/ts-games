package org.vaadin.johannest.views.highscores;

import java.util.*;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.flow.server.connect.exception.EndpointException;
import org.vaadin.johannest.backend.GameData;
import org.vaadin.johannest.backend.HighScore;

/**
 * The endpoint for the client-side Dashboard View.
 */
@Endpoint
@AnonymousAllowed
public class HighScoresEndpoint {

  private Map<String, GameData> gameData = new HashMap<>();

  public HighScoresEndpoint() {
    GameData value = new GameData();
    value.addScore(new HighScore("Foo", 1));
    gameData.put("starship-ts", value);
  }

  public List<String> getGames() {
    return new ArrayList<>(gameData.keySet());
  }

  public List<HighScore> getHighScores(String game) throws EndpointException {
    System.out.println("getHighScores for "+game);
    return gameData.get(game).getHighScores();
  }

  public void saveScore(String game, String player, int score) throws EndpointException {
    System.out.println("Save score"+game+" - "+player+": "+score);
    GameData gameDataItem = this.gameData.get(game);
    if (gameDataItem == null) {
      gameDataItem = new GameData();
      gameData.put(game, gameDataItem);
    }
    gameDataItem.addScore(new HighScore(player, score));
  }




}
