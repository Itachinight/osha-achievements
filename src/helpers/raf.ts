import {NoneToVoidFunc} from "../types";

export function raf(callback: NoneToVoidFunc) {
    return window.requestAnimationFrame(callback);
}