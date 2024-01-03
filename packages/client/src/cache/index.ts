import type { BrowserWindow } from "electron";

interface IAppMap {
    mainId: number;
    forceQuit: boolean;
}

export const winMap = new Map<number, BrowserWindow>();
export const gMap = new Map<keyof IAppMap, any>();

export const getMainWindow = () => {
    const id = gMap.get("mainId");
    return winMap.get(id);
};