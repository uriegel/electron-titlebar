import '../src/index.js'
import './menu.js'
console.log("Started")

export function setHiddenCallback(cb: (hidden:boolean)=>void) {
    setHidden = cb
    setHidden(true)
}

var setHidden