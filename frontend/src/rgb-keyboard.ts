import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './rgb-key';

@customElement('rgb-keyboard')
class RGBKeyboard extends LitElement {
    // A Map to store key labels and their positions as [x, y] tuples
    @state()
    keyPositions: Map<string, [number, number]> = new Map();

    // Background image URL as an attribute
    @property({ type: String, attribute: 'background-url' })
    backgroundUrl: string = '';

    static styles = css`
    :host {
      display: block;
      position: relative;
      width: 800px;  /* Adjust to the keyboard image's dimensions */
      height: 300px; /* Adjust to the keyboard image's dimensions */
      background-size: cover;
    }

    .key {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: grab;
    }

    .key:active {
      cursor: grabbing;
    }

    .button-container {
      margin-top: 10px;
    }
  `;

    onDragOver(event: DragEvent) {
        // Allow drop
        event.preventDefault();
    }

    onDrop(event: DragEvent) {
        // Get the label from the dataTransfer
        const target = event.target as HTMLElement;
        const label = target.textContent?.trim();
        if (!label || !this.keyPositions.has(label)) return;

        // Calculate the new position
        const newX = event.clientX;
        const newY = event.clientY;

        // Update the key position reactively
        this.keyPositions = new Map(this.keyPositions).set(label, [newX, newY]);
    }

    dumpKeyPositions() {
        // Log the current key positions to the console
        console.log('Key Positions:', Array.from(this.keyPositions.entries()));
    }

    render() {
        return html`
      <div
        @dragover="${this.onDragOver}"
        @drop="${this.onDrop}"
        style="width: 100%; height: 100%; background-image: url('${this.backgroundUrl}');"
      >
        ${Array.from(this.keyPositions.entries()).map(([label, [x, y]]) => {
            return html`
            <rgb-key
              class="key"
              draggable="true"
              style="left: ${x}px; top: ${y}px;"
            >
              ${label}
            </rgb-key>
          `;
        })}
      </div>
      <div class="button-container">
        <button @click="${this.dumpKeyPositions}">Dump Key Positions to Console</button>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'rgb-keyboard': RGBKeyboard;
    }
}
