import {LitElement, html, customElement, css} from 'lit-element';
import {StarshipHopper} from "./starship-hopper";
import {FuelIndicator} from "./fuel-indicator";

import './starship-hopper';
import './fuel-indicator';

@customElement('starship-game')
export class StarshipGame extends LitElement {
    static get styles() {
        return css`
          :host {
            display: block;
            position: absolute;
            transform: none;
          }
          svg {
            position: absolute;
            top: 0;
            left: 0;
          }`;
    }

    render() {
        return html`
          <svg id="landerFrame" width="500" height="600" @click="${this.buttonClick}">
            <defs>
              <linearGradient id="skyGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"   stop-color="blue" stop-opacity="0.33" />
                  <stop offset="100%" stop-color="blue" stop-opacity="0.05" />
              </linearGradient>
            </defs>
    
            <rect width="500" height="600" fill="url(#skyGradient)" style="stroke-width:1;stroke:rgb(0,0,0)" />
            <text x="50" y="35" fill="white">Click mouse to decelerate spacecraft.</text>
          </svg>
          <fuel-indicator id="fuel"></fuel-indicator>
          <starship-hopper id="shipx"></starship-hopper>
        `;
    }

    origo_y = 587;
    time_step = 0.0003;
    gravity = 9.81;
    time_elapsed = 0;
    game_on = false;
    end_counter = 0;
    shipx: StarshipHopper | null = null;
    fuelIndicator: FuelIndicator | null = null;

    // Wait until all elements in the template are ready to set their properties
    firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties);
        this.shipx = this.shadowRoot!.querySelector("starship-hopper");
        this.fuelIndicator = this.shadowRoot!.querySelector("fuel-indicator");
        this.game_on = true;
    }

    gameTick() {
        if (this.game_on) {
            this.updateGame();
            this.redraw();
            ++this.time_elapsed;
        }
        else if (this.shipx != null) {
            this.shipx.updateGame(this.gravity, this.time_step);
        }
    }

    updateGame() {
        if (this.shipx != null) {
            if (this.shipx.getY() < this.origo_y) {
                this.shipx.updateGame(this.gravity, this.time_step);
            } else {
                this.shipx.halt();
                this.game_on = false;
            }
        }
    }

    redraw() {
        if (this.shipx != null) {
            this.shipx!.reDraw();
            this.fuelIndicator!.setValue(this.shipx!.getFuel());
            //console.log("time: "+this.time_elapsed+"   velocity: "+this.$.shipx.getV()+"   fuel: "+this.$.shipx.getFuel());
        }
    }

    buttonClick() {
        this.shipx!.thrust();
    }
}
