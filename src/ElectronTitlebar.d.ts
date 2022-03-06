export declare class ElectronTitlebar extends HTMLElement {
    private titlebar;
    private minimize;
    private maximize;
    private close;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(attributeName: string): void;
    connectedCallback(): void;
    setFocused(hasFocus: boolean): void;
    disableTitlebar(): void;
}
