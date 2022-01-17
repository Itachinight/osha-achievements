export function isSmallWidth(): boolean {
    return window.matchMedia('(max-width: 768px)').matches;
}