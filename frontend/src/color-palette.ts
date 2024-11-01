import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import './color-picker-hsla' // Make sure to import your existing color-picker-hsla component

@customElement('color-palette')
export class ColorPalette extends LitElement {
    static styles = css`
        :host {
            display: block;
            max-width: 800px; /* Set a fixed max width for the component */
        }
        .palette-container {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(2, auto);
            gap: 10px;
            width: 100%;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }
        @media (max-width: 800px) {
            .palette-container {
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(8, auto);
                width: 0;
            }
        }
    `

    render() {
        return html`
            <div class="palette-container">
                ${Array.from({ length: 16 }, () => html`<color-picker-hsla></color-picker-hsla>`)}
            </div>
        `
    }
}
