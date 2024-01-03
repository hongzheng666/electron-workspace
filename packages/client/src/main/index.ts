import { app, screen, BrowserWindow } from "electron";
import { gMap } from "../cache";

const closeWindows = (win) => {
    (win.webContents as any)?.destroy();
}

export const createMainWindow = () => {
    let win = new BrowserWindow({
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        show: false,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true, // 支持webworker
        }
    });
    console.log('process.env', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
        win.webContents.loadURL("http://localhost:5173/");
    } else {
        win.webContents.loadFile("./dist/index.html");
    }

    win.once("ready-to-show", () => {
        win.show();
    });
    win.on("closed", function () {
        win = null as any;
    });
    win.on("close", (e) => {
        const forceQuit = gMap.get("forceQuit");
        const isFocused = win.isFocused();
        //如果应用窗口是隐藏状态触发退出时则直接退出
        if (!isFocused) {
            closeWindows(win);
            win = null as any;
        } else {
            if (process.platform !== "darwin") {
                closeWindows(win);
            }
            if (!forceQuit) {
                gMap.set("forceQuit", false);
                e.preventDefault(); //阻止默认事件，这里是不让窗口关闭
                win.hide();
            } else {
                closeWindows(win);
                app.quit();
            }
        }
    });
};
