import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './rgb-key';

const isDev = false;

@customElement('rgb-keyboard')
export class RGBKeyboard extends LitElement {
    // A Map to store key labels and their positions as [x, y] tuples
    @state()
    public keyPositions: Map<string, [number, number]> = new Map();

    // Background image URL as an attribute
    @property({ type: String, attribute: 'background-url' })
    backgroundUrl: string = '';

    // State for tracking dragging and focus
    private draggingKeyLabel: string | null = null;
    private focusedKeyLabel: string | null = null;
    private offsetX = 0;
    private offsetY = 0;

    // Reference to the container for boundary checks
    private containerRect: DOMRect | null = null;

    static styles = css`
    :host {
      display: block;
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .key {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: grab;
    }

    .key:focus {
      outline: 2px solid blue;
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('mousemove', this.onMouseMove.bind(this));
        window.removeEventListener('mouseup', this.onMouseUp.bind(this));
        window.removeEventListener('keydown', this.onKeyDown.bind(this));
        super.disconnectedCallback();
    }

    firstUpdated() {
        // Load the image to get its dimensions
        if (this.backgroundUrl) {
            const img = new Image();
            img.src = this.backgroundUrl;

            img.onload = () => {
                // Set the dimensions of the component to match the image
                this.style.width = `${img.naturalWidth}px`;
                this.style.height = `${img.naturalHeight}px`;
                this.containerRect = this.getBoundingClientRect();
            };
        }
    }

    onMouseDown(event: MouseEvent, label: string) {
        // Only allow dragging during development
        if (!isDev) return;

        // Start dragging and calculate the initial offsets
        this.draggingKeyLabel = label;
        const [currentX, currentY] = this.keyPositions.get(label) || [0, 0];
        this.offsetX = event.clientX - currentX;
        this.offsetY = event.clientY - currentY;

        // Focus the key when clicked
        this.focusedKeyLabel = label;

        // Prevent default behavior to avoid text selection
        event.preventDefault();
    }

    onMouseMove(event: MouseEvent) {
        // Only allow dragging during development
        if (!isDev) return;

        if (this.draggingKeyLabel && this.containerRect) {
            // Calculate the new position based on the mouse movement and offsets
            let newX = event.clientX - this.offsetX;
            let newY = event.clientY - this.offsetY;

            // Restrict the position within the container's bounds
            const containerWidth = this.containerRect.width;
            const containerHeight = this.containerRect.height;
            const keyWidth = 50; // Assume average key width
            const keyHeight = 50; // Assume average key height

            newX = Math.max(keyWidth / 2, Math.min(newX, containerWidth - keyWidth / 2));
            newY = Math.max(keyHeight / 2, Math.min(newY, containerHeight - keyHeight / 2));

            // Update the key position reactively
            this.keyPositions = new Map(this.keyPositions).set(this.draggingKeyLabel, [newX, newY]);
        }
    }

    onMouseUp() {
        if (!isDev) return;
        // Stop dragging
        this.draggingKeyLabel = null;
    }

    onKeyDown(event: KeyboardEvent) {
        // Only allow dragging during development
        if (!isDev) return;

        if (!this.focusedKeyLabel || !this.containerRect) return;

        // Get the current position of the focused key
        const [currentX, currentY] = this.keyPositions.get(this.focusedKeyLabel) || [0, 0];
        let newX = currentX;
        let newY = currentY;

        // Adjust position based on arrow key input
        switch (event.key) {
            case 'ArrowUp':
                newY -= 1;
                break;
            case 'ArrowDown':
                newY += 1;
                break;
            case 'ArrowLeft':
                newX -= 1;
                break;
            case 'ArrowRight':
                newX += 1;
                break;
            default:
                return; // Ignore other keys
        }

        // Restrict the new position within the container's bounds
        const containerWidth = this.containerRect.width;
        const containerHeight = this.containerRect.height;
        const keyWidth = 50; // Assume average key width
        const keyHeight = 50; // Assume average key height

        newX = Math.max(keyWidth / 2, Math.min(newX, containerWidth - keyWidth / 2));
        newY = Math.max(keyHeight / 2, Math.min(newY, containerHeight - keyHeight / 2));

        // Update the position of the focused key
        this.keyPositions = new Map(this.keyPositions).set(this.focusedKeyLabel, [newX, newY]);

        // Prevent default behavior like scrolling
        event.preventDefault();
    }

    // Expose key positions as a method
    getKeyPositions(): string {
        // Create a TypeScript-compatible string representation of the keyPositions map
        const tsRepresentation = `new Map<string, [number, number]>([\n${Array.from(this.keyPositions.entries())
            .map(([label, [x, y]]) => `  ['${label}', [${x}, ${y}]]`)
            .join(',\n')}\n])`;

        return tsRepresentation;
    }

    render() {
        return html`
      <div
        style="width: 100%; height: 100%; background-image: url('${this.backgroundUrl}');"
      >
        ${Array.from(this.keyPositions.entries()).map(([label, [x, y]]) => {
            return html`
            <rgb-key
              class="key"
              tabindex="0"
              style="left: ${x}px; top: ${y}px;"
              @mousedown="${(e: MouseEvent) => this.onMouseDown(e, label)}"
              @blur="${() => this.focusedKeyLabel = null}"
            >
              ${label}
            </rgb-key>
          `;
        })}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'rgb-keyboard': RGBKeyboard;
    }
}
