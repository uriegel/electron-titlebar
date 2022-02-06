"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
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
    };
    const win = new electron_1.BrowserWindow(bounds);
    electron_1.ipcMain.on("openDevTools", (evt, arg) => win.webContents.openDevTools());
    electron_1.ipcMain.on("fullscreen", (evt, arg) => win.setFullScreen(!win.isFullScreen()));
    electron_1.ipcMain.on("minimize", (evt, arg) => win.minimize());
    electron_1.ipcMain.on("maximize", (evt, arg) => {
        if (win.isMaximized())
            win.restore();
        else
            win.maximize();
    });
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on("focus", () => win.webContents.send("focus"));
    win.on("blur", () => win.webContents.send("blur"));
    win.loadFile('index.html');
};
electron_1.app.removeAllListeners('ready');
electron_1.app.on('ready', createWindow);
//# sourceMappingURL=main.js.map