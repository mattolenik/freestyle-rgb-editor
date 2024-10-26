import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rgb-key')
class RGBKey extends LitElement {
    // Proper usage of the @property decorator
    @property({ type: String })
    color: string = '#FFFFFF';

    static styles = css`
    :host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border: 1px solid #333;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      font-family: 'Arial', sans-serif;
      font-weight: bold;
      font-size: 20px;
      user-select: none;
      transition: background-color 0.3s;
    }
  `;

    render() {
        // Direct binding of color to style
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
