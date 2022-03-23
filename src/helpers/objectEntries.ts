type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T];

export function objectEntries<T extends object>(obj: T): Entry<T>[] {
    return (Object.keys(obj) as Array<keyof T>).map((key) => [key, obj[key]]);
}