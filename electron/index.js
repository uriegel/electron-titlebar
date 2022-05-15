import '../src/index.js';
import './menu.js';
console.log("Started");
export function setHiddenCallback(cb) {
    setHidden = cb;
    setHidden(true);
}
const titlebar = document.getElementsByTagName("ELECTRON-TITLEBAR")[0];
titlebar.addEventListener("onMaximize", () => alert("onMaximize"));
titlebar.addEventListener("onMinimize", () => alert("onMinimize"));
var setHidden;
//# sourceMappingURL=index.js.map