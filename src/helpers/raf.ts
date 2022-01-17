import {NoneToVoidFunc} from '../types';

export function raf(callback: NoneToVoidFunc): void {
    window.requestAnimationFrame(callback);
}