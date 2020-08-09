import {LitElement, html, customElement, css} from 'lit-element';
import {StarshipSmoke} from "./starship-smoke";

import './starship-smoke'

@customElement('starship-hopper')
export class StarshipHopper extends LitElement {
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
            transform: translate(160px,-50px);
          }
      `;
    }

    ship_x = 50;
    ship_y = 50;
    ship_velocity = 0;
    fuel = 100;
    thruster_a = 250;
    limit_velocity = 0.1;
    thruster_on = false;
    exploded = false;

    render() {
        return html`
       <svg id="shipShape" width="50" height="70">
        <path id="ship" d="M20 60 L30 61 L40 60 L35 30 L30 30 L25 30 Z" transform="scale(1,1)" style="fill:rgba(255,255,255,1);stroke-width:1;stroke:rgb(0,0,0)" />
        <path id="door" d="M27 52 L33 52 L31 42 L29 42 Z" style="fill:rgba(255,255,255,1);stroke-width:1;stroke:rgb(0,0,0)" />
       </svg>
    `;
    }

    getY():number {
        return this.ship_y;
    }

    getV():number {
        return this.ship_velocity;
    }

    getFuel():number {
        return this.fuel;
    }

    thrust() {
        if (this.fuel > 0) {
            for (let i = 0; i < 3; i++) {
                var s: StarshipSmoke = document.createElement('starship-smoke') as StarshipSmoke;
                this.shadowRoot!.appendChild(s);
                s.intializeSmoke(1, 1);
            }
            this.thruster_on = true;
        }
    }

    updateGame(gravity: number, time_step: number) {
        if (!this.exploded) {
            this.ship_velocity += gravity * time_step;
            if (this.thruster_on) {
                this.fuel -= 2;
                this.ship_velocity -= this.thruster_a * time_step;
                this.thruster_on = false;
            }
            this.ship_y += (this.ship_velocity * gravity / 2.0);
        }
        this.updateSmoke();
    }

    updateSmoke() {
        [].forEach.call(this.shadowRoot!.querySelectorAll('starship-smoke'), function (el: StarshipSmoke) {
            el.increaseTime();
            if (el.getTimer() > 49) {
                el.parentNode!.removeChild(el);
            }
        });
    }

    halt() {
        this.removeSmoke();
        if (this.ship_velocity > this.limit_velocity) {
            this.explode();
        }
    }

    removeSmoke() {
        [].forEach.call(this.shadowRoot!.querySelectorAll('starship-smoke'), function (el: StarshipSmoke) {
            el.parentNode!.removeChild(el);
        });
    }

    explode() {
        console.log("BOOM!");
        this.exploded= true;
        this.shadowRoot!.querySelector('#ship')!.setAttribute("transform", "scale(0,0)");
        this.shadowRoot!.querySelector('#door')!.setAttribute("transform", "scale(0,0)");

        for (let i = 0; i < 50; i++) {
            var s: StarshipSmoke = document.createElement('starship-smoke') as StarshipSmoke;
            this.shadowRoot!.appendChild(s);
            s.intializeSmoke(-1 - Math.random(), 10);
        }
    }

    reDraw() {
        this.style.transform = "translateY(" + this.ship_y + "px)";
    }
}