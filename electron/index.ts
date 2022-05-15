import '../src/index.js'
import './menu.js'
import { ElectronTitlebar } from '../src/ElectronTitlebar'
console.log("Started")

export function setHiddenCallback(cb: (hidden:boolean)=>void) {
    setHidden = cb
    setHidden(true)
}

const titlebar = document.getElementsByTagName("ELECTRON-TITLEBAR")[0]! as ElectronTitlebar
titlebar.addEventListener("onMaximize", () => alert("onMaximize"))
titlebar.addEventListener("onMinimize", () => alert("onMinimize"))

var setHidden