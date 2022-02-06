//import { setHiddenCallback } from "./index.js"
const electron: any = window.require('electron')

interface Window { 
    onRename: ()=>void
    onExtendedRename: ()=>void
    onCopy: ()=>void
    onMove: ()=>void
    onDarkTheme: (isChecked: boolean)=>void
    onClose: ()=>void
    close: ()=>void
    onHidden: (isChecked: boolean)=>void
    onDevTools: ()=>void
}

window.onRename = () => {
    alert("Rename")
}

window.onExtendedRename = () => alert("Extended Rename")
window.onCopy = () => alert("Copy Files")
window.onMove = () => console.log("Move Files")
window.onDarkTheme = (isChecked: boolean) => {
    if (isChecked)
        document.body.classList.add("darkTheme")
    else
        document.body.classList.remove("darkTheme")
}

window.onClose = () => window.close()
window.onHidden = (isChecked: boolean) => console.log(`Show hidden ${isChecked}`)

//(window as any).setHidden = (mi: MenuItem) => setHiddenCallback(isChecked => mi.isChecked = isChecked)

window.onDevTools = () => electron.ipcRenderer.send("openDevTools")