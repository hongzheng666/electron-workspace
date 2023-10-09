import { app, BrowserWindow, Menu } from "electron";
// if (process.env.NODE_ENV === "development") {
//     require("module-alias/register");
// }
import { createMainWindow } from "./main";
import { gMap, getMainWindow } from "./cache";

app.whenReady().then(() => {
    createMainWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        } else {
            const win = getMainWindow();
            win && win.show();
        }
    });
});

// 当所有窗口关闭，退出应用
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// 渲染进程进程奔溃
app.on("render-process-gone", (event, webContents, details) => {
    // 定位原因，可通过log记录；也可以做重启retry操作，切记限制count
    // webContents.reloadIgnoringCache(); // 忽略缓存强制刷新页面
    if (details.reason === "crashed") {
        const mainWindow = getMainWindow() as BrowserWindow;
        mainWindow.reload();
    }
});

// 只有显式调用quit才退出系统，区分MAC系统程序坞退出和点击X关闭退出
app.on("before-quit", () => {
    gMap.set("force_quit", true);
});