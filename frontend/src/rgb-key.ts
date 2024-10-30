import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rgb-key')
export class RGBKey extends LitElement {
  @property({ type: String })
  color: string = '#FFFFFF';

  static styles = css`
    :host {
      display: inline-block;
      width: 40px;  /* You can adjust this size */
      height: 40px; /* You can adjust this size */
      line-height: 40px;  /* Center text vertically */
      text-align: center;
      font-size: 14px;  /* Smaller text size */
      color: var(--key-color, #FFFFFF);
      background-color: transparent;
      user-select: none;
    }
  `;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('color')) {
      this.style.setProperty('--key-color', this.color);
    }
  }

  render() {
    return html`
      <div style="color: ${this.color};">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rgb-key': RGBKey;
  }
}
