import './components/Menubar.js'
import './menu.js'
console.log("Started")

export function setHiddenCallback(cb) {
    setHidden = cb
    setHidden(true)
}

var setHidden