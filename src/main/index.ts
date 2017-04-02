import * as electron from "electron";
import * as path from "path";
import * as url from "url";

import * as installExtensions from "electron-devtools-installer";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow: Electron.BrowserWindow = null;

function createWindow() {
    installExtensions.default(installExtensions.VUEJS_DEVTOOLS)
        .then(name => console.log(`Added extension: ${name}`))
        .catch(err => console.log("Unable to install `vue-devtools`:\n", err));

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    //mainWindow.setMenu(null);

    /*mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "..", "assets", "index.html"),
        protocol: "file",
        slashes: true
    }));*/
    mainWindow.loadURL("http://localhost:8080/assets/index.html");

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow == null) {
        createWindow();
    }
});
