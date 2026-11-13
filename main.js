const { app, BrowserWindow } = require("electron");

function createWindow() {
    const mainWindow = new BrowserWindow({
    width: 500,
    height: 580,
    minWidth: 400,
    minHeight: 500,
    resizable: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile("index.html");
	mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);