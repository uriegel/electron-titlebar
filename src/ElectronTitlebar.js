export class ElectronTitlebar extends HTMLElement {
    constructor() {
        super();
        var style = document.createElement("style");
        document.head.appendChild(style);
        style.sheet.insertRule(`:root {
            --electron-titlebar-color: black;
            --electron-titlebar-background-color: #eee;
            --electron-titlebar-button-hover-color: lightgray;
            --electron-titlebar-focused-color: blue;
            --electron-titlebar-height: 30px;
        }`);
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = ` 
            <style>
                #titlebar {
                    display: flex;
                    color: var(--electron-titlebar-color);
                    background-color: var(--electron-titlebar-background-color);
                    height: var(--electron-titlebar-height);
                    border-top: 1px solid transparent;
                }
                #titlebar.focused {
                    border-top: 1px solid var(--electron-titlebar-focused-color);
                }
                #titlebar.none {
                    border-top: none;
                    height: auto;
                }
                #icon {
                    height: var(--electron-titlebar-height);
                }
                #dragregion {
                    flex-grow: 1;
                    text-align: center;
                    vertical-align: middle;
                    margin: 3px 3px 0px 0px;
                    -webkit-app-region: drag;
                    display: flex;
                    align-items: center;   
                }
                #dragregion.hidden {
                    display: none;
                }
                #title {
                    flex-grow: 1;   
                    margin-top: -3px;        
                }
                .button {
                    width: 44px;
                    text-align: center;
                    font-size: 12pt;
                    display: flex;
                    align-items: center;        
                    cursor: pointer;
                }
                .button>span {
                    flex-grow: 1;   
                    margin-top: -3px;
                    user-select: none;
                }
                .button:hover {
                    background-color: var(--electron-titlebar-button-hover-color);
                }
                .close:hover {
                    background-color: red;
                    color: white;
                }
                .button>span.dash {
                    vertical-align: sub;
                    margin-top: 0px;
                }
                .hidden {
                    display: none;
                }
                .forceHidden {
                    display: none;!
                }
            </style>
            <div id="titlebar">
                <img id="icon">
                <slot></slot>
                <div id="dragregion">
                    <span id="title"></span>
                </div>
                <div id="minimize" class="button"><span class="dash">&#x2012;</span></div>
                <div id="maximize" class="button"><span>&#9744;</span></div>                
                <div id="restore" class="button hidden"><span>&boxbox;</span></div>                
                <div id="close" class="button close"><span>&#10005;</span></div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const title = this.shadowRoot.getElementById("title");
        this.titlebar = this.shadowRoot.getElementById("titlebar");
        title.innerText = this.getAttribute("window-title") ?? "";
        this.minimize = this.shadowRoot.getElementById("minimize");
        this.maximize = this.shadowRoot.getElementById("maximize");
        this.restore = this.shadowRoot.getElementById("restore");
        this.close = this.shadowRoot.getElementById("close");
        this.titlebar.classList.add("focused");
        const notitlebar = this.getAttribute("no-titlebar");
        if (notitlebar)
            this.showTitlebar(false);
        else {
            const icon = this.shadowRoot.getElementById("icon");
            icon.src = this.getAttribute("icon") ?? "";
        }
    }
    static get observedAttributes() {
        return ['no-titlebar', 'icon'];
    }
    attributeChangedCallback(attributeName) {
        switch (attributeName) {
            case "no-titlebar":
                this.showTitlebar(false);
                break;
            case "icon":
                const icon = this.shadowRoot.getElementById("icon");
                icon.src = this.getAttribute("icon") ?? "";
                break;
        }
    }
    connectedCallback() {
        this.close.addEventListener("click", () => this.dispatchEvent(new CustomEvent('onclose')));
        this.maximize.addEventListener("click", () => this.dispatchEvent(new CustomEvent('onmaximize')));
        this.restore.addEventListener("click", () => this.dispatchEvent(new CustomEvent('onrestore')));
        this.minimize.addEventListener("click", () => this.dispatchEvent(new CustomEvent('onminimize')));
    }
    setFocused(hasFocus) {
        if (hasFocus)
            this.titlebar.classList.add("focused");
        else
            this.titlebar.classList.remove("focused");
    }
    setMaximized(isMaximized) {
        this.addClassList(this.restore, "hidden", isMaximized);
        this.addClassList(this.maximize, "hidden", !isMaximized);
    }
    showTitlebar(show) {
        const icon = this.shadowRoot.getElementById("icon");
        const dragregion = this.shadowRoot.getElementById("dragregion");
        this.addClassList(icon, "forceHidden", !show);
        this.addClassList(dragregion, "forceHidden", !show);
        this.addClassList(this.minimize, "forceHidden", !show);
        this.addClassList(this.maximize, "forceHidden", !show);
        this.addClassList(this.restore, "forceHidden", !show);
        this.addClassList(this.close, "forceHidden", !show);
        this.addClassList(this.titlebar, "none", !show);
    }
    addClassList(element, cls, add) {
        if (add)
            element?.classList.add(cls);
        else
            element?.classList.remove(cls);
    }
}
customElements.define('electron-titlebar', ElectronTitlebar);
