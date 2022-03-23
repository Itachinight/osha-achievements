export const PREFERS_REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const IS_IOS = ['iPhone', 'iPad', 'iPod'].indexOf(window.navigator.platform) !== -1;