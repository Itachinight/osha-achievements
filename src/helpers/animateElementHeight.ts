import {PREFERS_REDUCE_MOTION} from '../env';
import {NoneToVoidFunc} from '../types';
import {raf} from './raf';
import {GROUP_SPOILER_ANIMATION_DURATION} from "../config";
import {supportsAnimate} from "./supportsAnimate";

const duration = PREFERS_REDUCE_MOTION ? 0 : GROUP_SPOILER_ANIMATION_DURATION;

export function animateElementHeight(element: HTMLElement, start: number, end: number, onFinish: NoneToVoidFunc): void {
    if (supportsAnimate(element)) {
        element.animate(
            [
                {height: `${start}px`},
                {height: `${end}px`}
            ],
            {duration, easing: 'linear'}
        ).addEventListener('finish', onFinish);
    } else {
        fallbackAnimation(element, start, end, onFinish);
    }
}

function fallbackAnimation(elem: HTMLElement, start: number, end: number, onFinish: NoneToVoidFunc): void {
    elem.style.transitionProperty = 'all';
    elem.style.transitionDuration = `${duration}ms`;
    elem.style.transitionTimingFunction = 'linear';

    elem.style.height = `${start}px`;

    raf(() => elem.style.height = `${end}px`);

    const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.target !== elem || e.propertyName !== 'height') {
            return;
        }

        onFinish();

        elem.style.transitionProperty = '';
        elem.style.transitionDuration = '';
        elem.style.transitionTimingFunction = '';
        elem.style.height = '';

        elem.removeEventListener('transitionend', handleTransitionEnd);
    }

    elem.addEventListener('transitionend', handleTransitionEnd);
}