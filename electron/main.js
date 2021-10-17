const { app, BrowserWindow } = require('electron')

const createWindow = () => {    
    const bounds = { 
        width: 800,
        height: 600,
    } 
    //bounds.frame = false
    bounds.show = false 
    bounds.webPreferences = {
        nodeIntegration: true,
        allowRunningInsecureContent: true
    }        
    
    win = new BrowserWindow(bounds)   
//        win.maximize()

    // electron.ipcMain.on("openDevTools",  (evt, arg) => win.webContents.openDevTools())
    // electron.ipcMain.on("fullscreen",  (evt, arg) => win.setFullScreen(!win.isFullScreen()))
    // electron.ipcMain.on("minimize",  (evt, arg) => win.minimize())
    // electron.ipcMain.on("maximize",  (evt, arg) => {
    // if (win.isMaximized())
    //     win.restore()
    // else
    //     win.maximize()  
    // })
    //electron.ipcMain.on("close",  (evt, arg) => stop(win.webContents))
    win.once('ready-to-show', () => { 
        win.show() 
    }) 

    win.loadFile('index.html')

    // win.on('maximize', () => {
    //     const bounds = win.getBounds()
    //     settings.set("window-bounds", bounds as any)
    //     settings.set("isMaximized", true)
    // })

    // win.on('unmaximize', () => {
    //     settings.set("isMaximized", false)
    // })    

    // win.on("closed", () => win = null)    
}

app.removeAllListeners('ready')
app.on('ready', createWindow)

app.on("activate", () => {
    if (win === null) 
        createWindow()
})

var win
