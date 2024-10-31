import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './color-picker-rgb'; // Import the color-picker component

@customElement('color-palette')
class ColorPalette extends LitElement {
    static styles = css`
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: auto auto; /* Define two rows that adjust to content */
      gap: 10px;
      width: 100%;
      max-width: 1000px;
      margin: auto;
    }
    color-picker {
    }
  `;

    render() {
        return html`
      <div class="palette-grid">
        ${Array.from({ length: 16 }, () => html`<color-picker></color-picker>`)}
      </div>
    `;
    }
}
