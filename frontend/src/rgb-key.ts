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

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('color')) {
            this.style.setProperty('--color', this.color)
        }
    }

    static styles = css`
        :host {
            display: inline-block;
            text-align: center;
            font-size: 14px;
            font-family: 'Quantify';
            background-color: transparent;
            user-select: none;
            text-shadow: 0 0 10px var(--color), 0 0 20px var(--color);
            color: var(--color);
        }
    `

    render() {
        return html`
            <div style="width: ${this.width}; height: ${this.height}; line-height: ${this.height};">
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
