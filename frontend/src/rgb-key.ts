import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('rgb-key')
export class RGBKey extends LitElement {
    @property({ type: String })
    color: string = '#FFFFFF'

    static styles = css`
        :host {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            background-color: transparent;
            user-select: none;
        }
    `

    render() {
        return html`
            <div style="color: ${this.color};">
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
