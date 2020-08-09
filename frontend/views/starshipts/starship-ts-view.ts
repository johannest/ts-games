import {LitElement, html, css, customElement} from 'lit-element';

import './starship-game';
import {StarshipGame} from "./starship-game";
import * as viewEndpoint from "../../generated/HighscoresEndpoint";

@customElement('starship-ts-view')
export class StarshipTSView extends LitElement {


    static get styles() {
        return css`
          :host {
            display: block;
          }
          h2 {
            padding-top: 170px;
            padding-left: 60px
          }
          vaadin-vertical-layout#actions {
            visibility:hidden;
            display:block;
            width:500px;
          }
          vaadin-button#restart {
            display:block;
            width:500px
          }
          vaadin-horizontal-layout#scoreLo {
            display:block;
            visibility: hidden;
            width:500px;
          }
          vaadin-text-field {
            display:block;
            width:350px;
            height:30px;
          }
          vaadin-button#restart {
            display:block;
            width:150px
          }
        `;
    }

    lastScore = 0;

    render() {
        return html`
          <vaadin-vertical-layout id="actions">
          <vaadin-button id="restart" @click="${this.restart}">TRY AGAIN!</vaadin-button>
          <vaadin-horizontal-layout id="scoreLo">
            <input type="text" id="player" />
            <vaadin-button id="submit" @click="${this.submitScore}">SUBMIT</vaadin-button>
          </vaadin-horizontal-layout>
          </vaadin-vertical-layout>
          <starship-game></starship-game>
    `;
    }

    _step(game: StarshipGame) {
        if (game == null) {
            console.log("Game not found");
        }

        if (game != null && (game.game_on || game.end_counter<50)) {
            if (!game.game_on) {
                ++game.end_counter;
            }

            var that = this;
            game.gameTick();
            window.requestAnimationFrame(function () {
                that._step(game);
            });
        } else if (game !=null) {
            var score = 0;
            if (!game.shipx!.exploded) {
                score = 3*game.fuelIndicator!.value;
            }
            this.lastScore = score;
            var gameOver = document.createElement('h2');
            gameOver.innerText = "GAME OVER - your score was "+score;
            this.shadowRoot!.appendChild(gameOver);

            var actions = this.shadowRoot!.querySelector("#actions");
            var scoreLo = this.shadowRoot!.querySelector("#scoreLo");
            if (actions != null) {
                // @ts-ignore
                actions.style.visibility = 'visible';
                if (score > 0 && scoreLo != null) {
                    // @ts-ignore
                    scoreLo.style.visibility = 'visible';
                }
            }
        }
    }

    // Wait until all elements in the template are ready to set their properties
    firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties);

        var game: StarshipGame | null = this.shadowRoot!.querySelector("starship-game");
        var that = this;
        window.requestAnimationFrame(function () {
            that._step(game!);
        });
    }

    restart() {
        location.reload();
    }

    submitScore() {
        // @ts-ignore
        var lastPlayer = this.shadowRoot!.querySelector("#player")!.value;
        console.log("PLAYER: "+lastPlayer)
        viewEndpoint.saveScore("starship-ts", lastPlayer, this.lastScore);

        var scoreLo = this.shadowRoot!.querySelector("#scoreLo");
        if (scoreLo != null) {
            // @ts-ignore
            scoreLo.style.visibility = 'hidden';
        }
    }
}


