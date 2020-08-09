import { customElement, html, LitElement, query, unsafeCSS } from 'lit-element';

// web components used in the view
import '@vaadin/vaadin-board/vaadin-board';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid';
import '@vaadin/vaadin-lumo-styles/all-imports';

// import the remote endpoint
import * as viewEndpoint from '../../generated/HighscoresEndpoint';

// utilities to import style modules
import { CSSModule } from '@vaadin/flow-frontend/css-utils';

import styles from './highscores-view.css';
import HighScore from "../../generated/org/vaadin/johannest/backend/HighScore";

@customElement('highscores-view')
export class HighscoresView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), CSSModule('lumo-badge'), unsafeCSS(styles)];
  }

  @query('#grid') private grid: any;

  render() {
    return html`
      <vaadin-board>
        <vaadin-board-row>
          <div class="wrapper">
            <div class="card">
              <h3>Starship-TS</h3>
              <vaadin-grid id="grid" theme="no-border">
                <vaadin-grid-column path="name" header="Player"></vaadin-grid-column>
                <vaadin-grid-column path="score" header="Score"></vaadin-grid-column>
              </vaadin-grid>
            </div>
          </div>
          <div class="wrapper">
            <div class="card">
              <h3>TODO</h3>
              </vaadin-chart>
            </div>
          </div>
        </vaadin-board-row>
      </vaadin-board>
    `;
  }

  // Wait until all elements in the template are ready to set their properties
  firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    // Retrieve data from the server-side endpoint.
    viewEndpoint.getHighScores("starship-ts").then((items:HighScore[]) => {
      this.grid.items = items;
    });
  }

}
