import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import './color-picker-hsla'

@customElement('color-palette')
export class ColorPalette extends LitElement {
    static styles = css`
        :host {
            display: block;
            max-width: 1130px;
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(2, auto);
            gap: 10px;
            width: 100%;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }
    `

    render() {
        return html` ${Array.from({ length: 12 }, () => html`<color-picker-hsla></color-picker-hsla>`)} `
    }
}
