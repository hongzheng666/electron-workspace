import type { BrowserWindow, BrowserView } from "electron";

interface IAppMap {
    main_id: number;
    main_content_id: number;
    child_id: number;
    child_content_id: number;
    init_view_content_id: number;
    view_content_id: number;
    force_quit: boolean;
}

export const winMap = new Map<number, BrowserWindow>();
export const gMap = new Map<keyof IAppMap, any>();

export const getMainWindow = () => {
    const id = gMap.get("main_id");
    return winMap.get(id);
};