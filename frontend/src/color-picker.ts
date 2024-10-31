import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('color-picker')
class ColorPicker extends LitElement {
    // RGBA properties
    @state() red = 255;
    @state() green = 255;
    @state() blue = 255;
    @state() alpha = 1;

    // Computed property for the hex color code
    get hexColor() {
        const r = this.red.toString(16).padStart(2, '0');
        const g = this.green.toString(16).padStart(2, '0');
        const b = this.blue.toString(16).padStart(2, '0');
        const a = Math.round(this.alpha * 255).toString(16).padStart(2, '0');
        return `#${r}${g}${b}${a}`;
    }

    // Computed property for the RGBA background color
    get rgbaColor() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    static styles = css`
    .picker-container {
      position: relative;
      width: 180px;
      height: 180px;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      box-sizing: border-box;
    }
    .color-display {
      width: 100%;
      height: 100%;
      background-color: var(--current-color, rgba(255, 255, 255, 1));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-radius: 4px;
      padding: 8px;
      box-sizing: border-box;
    }
    .sliders {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }
    .hex-display {
      margin-top: auto;
      text-align: center;
      font-size: 14px;
      color: #333;
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hex-display input {
      background-color: transparent;
      border: none;
      font-size: 14px;
      color: #333;
      width: 100%;
      text-align: center;
      outline: none;
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 4px;
      background: #ddd;
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: var(--thumb-color, #ffffff);
      cursor: pointer;
      border: 1px solid #888;
    }
    /* Set slider thumb colors for each channel */
    .red-slider input[type="range"]::-webkit-slider-thumb {
      background-color: red;
    }
    .green-slider input[type="range"]::-webkit-slider-thumb {
      background-color: green;
    }
    .blue-slider input[type="range"]::-webkit-slider-thumb {
      background-color: blue;
    }
    .alpha-slider input[type="range"]::-webkit-slider-thumb {
      background-color: #ffffff;
    }
  `;

    updateColor(e: Event, color: 'red' | 'green' | 'blue' | 'alpha') {
        const target = e.target as HTMLInputElement;
        const value = color === 'alpha' ? parseFloat(target.value) : parseInt(target.value, 10);
        this[color] = value;
        this.style.setProperty('--current-color', this.rgbaColor);
    }

    render() {
        return html`
      <div class="picker-container">
        <!-- Inner container with the dynamically set background color -->
        <div class="color-display" style="--current-color: ${this.rgbaColor}">
          <div class="sliders">
            <!-- Red Slider -->
            <div class="slider-group red-slider">
              <input
                type="range"
                min="0"
                max="255"
                .value="${this.red}"
                @input="${(e: Event) => this.updateColor(e, 'red')}"
              />
            </div>

            <!-- Green Slider -->
            <div class="slider-group green-slider">
              <input
                type="range"
                min="0"
                max="255"
                .value="${this.green}"
                @input="${(e: Event) => this.updateColor(e, 'green')}"
              />
            </div>

            <!-- Blue Slider -->
            <div class="slider-group blue-slider">
              <input
                type="range"
                min="0"
                max="255"
                .value="${this.blue}"
                @input="${(e: Event) => this.updateColor(e, 'blue')}"
              />
            </div>

            <!-- Alpha Slider -->
            <div class="slider-group alpha-slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                .value="${this.alpha}"
                @input="${(e: Event) => this.updateColor(e, 'alpha')}"
              />
            </div>
          </div>
          <!-- Hex Code Display with Transparent Background on Input -->
          <div class="hex-display">
            <input type="text" .value="${this.hexColor}" readonly />
          </div>
        </div>
      </div>
    `;
    }
}
