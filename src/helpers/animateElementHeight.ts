import {PREFERS_REDUCE_MOTION} from '../env';
import {NoneToVoidFunc} from '../types';
import {raf} from './raf';
import {SPOILER_ANIMATION_MIN_DURATION, SPOILER_ANIMATION_MAX_DURATION} from '../config';

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

function getDuration(start: number, end: number): number {
    if (PREFERS_REDUCE_MOTION) {
        return 0;
    }

    // assume height === speed of animation
    const speed = Math.max(start, end);

    return clamp(speed, SPOILER_ANIMATION_MIN_DURATION, SPOILER_ANIMATION_MAX_DURATION);
}

export function animateElementHeight(element: HTMLElement, start: number, end: number, onFinish: NoneToVoidFunc): void {
    const duration = getDuration(start, end);

    element.style.transitionDuration = `${duration}ms`;
    element.style.maxHeight = `${start}px`;

    raf(() => element.style.maxHeight = `${end}px`);

    const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.target !== element || e.propertyName !== 'max-height') {
            return;
        }

        onFinish();

        element.style.transitionDuration = '';
        element.style.maxHeight = '';

        element.removeEventListener('transitionend', handleTransitionEnd);
    }

    element.addEventListener('transitionend', handleTransitionEnd);
}