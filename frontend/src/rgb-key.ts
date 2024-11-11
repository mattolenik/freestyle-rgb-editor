import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('rgb-key')
export class RGBKey extends LitElement {
    @property({ type: String, reflect: true })
    color: string = '#FFFFFF'

    @property({ type: String, reflect: true })
    width: String = '40px'

    @property({ type: String, reflect: true })
    height: String = '40px'

    static styles = css`
        :host {
            display: inline-block;
            text-align: center;
            font-size: 14px;
            font-family: 'Quantify';
            background-color: transparent;
            user-select: none;
        }
    `

    render() {
        return html`
            <div
                style="color: ${this.color}; width: ${this.width}; height: ${this.height}; line-height: ${this.height};"
            >
                <slot></slot>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'rgb-key': RGBKey
    }
}
