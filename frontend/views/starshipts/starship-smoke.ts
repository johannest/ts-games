import {LitElement, html, customElement, css} from 'lit-element';

@customElement('starship-smoke')
export class StarshipSmoke extends LitElement {
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
                transform: translate(185px,15px);
            }`;
    }

    time_elapsed = 0;
    smoke_x = 5;
    smoke_y = 15;
    xDirection = 0;
    yDirection = 1;
    speedFactor = 1;

    render() {
        return html`
          <svg id="smokeSvg" width="6" height="6">
            <circle id="smoke" cx="0" cy="0" r="3" stroke-width="0" fill="orange" />
          </svg>
        `;
    }

    intializeSmoke(yDir: number, speed: number) {
        this.xDirection = Math.random() * 3 - 1;
        this.yDirection = yDir;
        this.speedFactor = speed;
    }

    increaseTime() {
        this.time_elapsed++;
        this.smoke_x += this.xDirection * Math.abs(this.speedFactor) * (Math.random() * (0.2));
        this.smoke_y = this.yDirection * this.speedFactor * Math.floor(this.time_elapsed / 3.0);
        this.style.transform = "translate(" + this.smoke_x + "px, " + this.smoke_y + "px)";
        //console.log("smoke: "+this.time_elapsed+" x:"+this.smoke_x+" y:"+this.smoke_y);
    }

    getTimer() {
        return this.time_elapsed;
    }
}
