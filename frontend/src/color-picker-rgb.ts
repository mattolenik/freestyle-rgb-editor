import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('color-picker-rgb')
export class ColorPickerRGB extends LitElement {
    @property({ type: String, reflect: true })
    color = '#ffffffff' // Default color in hex format with alpha

    @state() red = 255
    @state() green = 255
    @state() blue = 255
    @state() alpha = 1

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('color')) {
            this.updateColorFromHex(this.color)
        }
        this.updateCSSVariables()
    }

    get hexColor() {
        const r = this.red.toString(16).padStart(2, '0')
        const g = this.green.toString(16).padStart(2, '0')
        const b = this.blue.toString(16).padStart(2, '0')
        const a = Math.round(this.alpha * 255)
            .toString(16)
            .padStart(2, '0')
        return `#${r}${g}${b}${a}`
    }

    set hexColor(value: string) {
        this.color = value
        this.updateColorFromHex(value)
    }

    get rgbaColor() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
    }

    get contrastColor() {
        const scaledRed = this.red * this.alpha
        const scaledGreen = this.green * this.alpha
        const scaledBlue = this.blue * this.alpha
        const luminance = 0.299 * scaledRed + 0.587 * scaledGreen + 0.114 * scaledBlue
        return luminance > 128 ? 'black' : 'white'
    }

    updateCSSVariables() {
        this.style.setProperty('--current-color', this.rgbaColor)
        this.style.setProperty('--contrast-color', this.contrastColor)
        this.style.setProperty('--contrast-color-rgb', this.contrastColor === 'black' ? '0, 0, 0' : '255, 255, 255')
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
            border-radius: 4px;
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
            font-size: 16px; /* Adjusted font size */
            padding: 5px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .hex-display input {
            background-color: transparent;
            border: none;
            font-size: 20px; /* Increased font size */
            color: var(--contrast-color);
            width: 100%;
            text-align: center;
            outline: none;
        }
        input[type='range'] {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 4px;
            outline: none;
            border: 1px solid rgba(var(--contrast-color-rgb), 0.5);
        }
        input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            cursor: pointer;
            border: 1px solid #888;
        }
        .red-slider input[type='range'] {
            background: linear-gradient(to right, transparent, red);
        }
        .red-slider input[type='range']::-webkit-slider-thumb {
            background-color: red;
        }
        .green-slider input[type='range'] {
            background: linear-gradient(to right, transparent, #00ff00);
        }
        .green-slider input[type='range']::-webkit-slider-thumb {
            background-color: #00ff00;
        }
        .blue-slider input[type='range'] {
            background: linear-gradient(to right, transparent, blue);
        }
        .blue-slider input[type='range']::-webkit-slider-thumb {
            background-color: blue;
        }
        .alpha-slider input[type='range'] {
            background: linear-gradient(to right, transparent, #fff);
        }
        .alpha-slider input[type='range']::-webkit-slider-thumb {
            background-color: #ffffff;
        }
    `

    updateColor(e: Event, color: 'red' | 'green' | 'blue' | 'alpha') {
        const target = e.target as HTMLInputElement
        const value = color === 'alpha' ? parseFloat(target.value) : parseInt(target.value, 10)
        this[color] = value
        this.color = this.hexColor
        this.updateCSSVariables()
    }

    handleHexInput(e: Event) {
        this.hexColor = (e.target as HTMLInputElement).value
    }

    updateColorFromHex(hex: string) {
        if (hex.length === 7 || hex.length === 9) {
            this.red = parseInt(hex.slice(1, 3), 16)
            this.green = parseInt(hex.slice(3, 5), 16)
            this.blue = parseInt(hex.slice(5, 7), 16)
            this.alpha = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1
        }
    }

    render() {
        return html`
            <div class="picker-container">
                <div class="color-display" style="--current-color: ${this.rgbaColor}">
                    <div class="sliders">
                        <div class="slider-group red-slider">
                            <input
                                type="range"
                                min="0"
                                max="255"
                                .value="${this.red}"
                                @input="${(e: Event) => this.updateColor(e, 'red')}"
                            />
                        </div>
                        <div class="slider-group green-slider">
                            <input
                                type="range"
                                min="0"
                                max="255"
                                .value="${this.green}"
                                @input="${(e: Event) => this.updateColor(e, 'green')}"
                            />
                        </div>
                        <div class="slider-group blue-slider">
                            <input
                                type="range"
                                min="0"
                                max="255"
                                .value="${this.blue}"
                                @input="${(e: Event) => this.updateColor(e, 'blue')}"
                            />
                        </div>
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
                    <div class="hex-display">
                        <input type="text" .value="${this.hexColor}" @input="${this.handleHexInput}" />
                    </div>
                </div>
            </div>
        `
    }
}
