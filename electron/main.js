const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {    
    const bounds = { 
        width: 800,
        height: 600,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true,
            contextIsolation: false
        }      
    } 
    
    win = new BrowserWindow(bounds)   

    ipcMain.on("openDevTools", (evt, arg) => win.webContents.openDevTools())
    ipcMain.on("fullscreen",  (evt, arg) => win.setFullScreen(!win.isFullScreen()))
    ipcMain.on("minimize",  (evt, arg) => win.minimize())
    ipcMain.on("maximize",  (evt, arg) => {
    if (win.isMaximized())
        win.restore()
    else
        win.maximize()  
    })
    
    win.once('ready-to-show', () => { 
        win.show() 
    })
    
    win.on("focus", () => win.webContents.send("focus"))
    win.on("blur", () => win.webContents.send("blur"))

    win.loadFile('index.html')
}

app.removeAllListeners('ready')
app.on('ready', createWindow)

app.on("activate", () => {
    if (win === null) 
        createWindow()
})

var win
