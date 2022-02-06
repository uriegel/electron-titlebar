"use strict";
//import { setHiddenCallback } from "./index.js"
const electron = window.require('electron');
window.onRename = () => {
    alert("Rename");
};
window.onExtendedRename = () => alert("Extended Rename");
window.onCopy = () => alert("Copy Files");
window.onMove = () => console.log("Move Files");
window.onDarkTheme = (isChecked) => {
    if (isChecked)
        document.body.classList.add("darkTheme");
    else
        document.body.classList.remove("darkTheme");
};
window.onClose = () => window.close();
window.onHidden = (isChecked) => console.log(`Show hidden ${isChecked}`);
//(window as any).setHidden = (mi: MenuItem) => setHiddenCallback(isChecked => mi.isChecked = isChecked)
window.onDevTools = () => electron.ipcRenderer.send("openDevTools");
//# sourceMappingURL=menu.js.map