import {PREFERS_REDUCE_MOTION} from "../env";

export function animateElementHeight(element: Element, start: number, end: number): Animation {
    return element.animate(
        [
            {height: `${start}px`},
            {height: `${end}px`}
        ],
        {duration: PREFERS_REDUCE_MOTION ? 0 : 600, easing: 'linear'}
    );
}