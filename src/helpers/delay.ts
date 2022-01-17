import {NoneToVoidFunc} from '../types';

export function delay(callback: NoneToVoidFunc, delay?: number): number {
    return window.setTimeout(callback, delay);
}