import {raf} from "./raf";
import {NoneToVoidFunc} from "../types";
import {objectEntries} from "./objectEntries";
import {MODAL_ANIMATION_DURATION} from "../config";
import {PREFERS_REDUCE_MOTION} from "../env";
import {supportsAnimate} from "./supportsAnimate";

type ModalAnimationState = {
    width: string
    height: string
    top: string
    left: string
    opacity: string | number
}

export class ModalAnimation {
    private static readonly options: KeyframeAnimationOptions = {
        duration: PREFERS_REDUCE_MOTION ? 0 : MODAL_ANIMATION_DURATION,
        easing: 'ease-in-out',
        fill: 'both',
    };

    public static animateOpen(elem: HTMLElement, rect: DOMRect, isMobile: boolean, onFinish: NoneToVoidFunc): void {
        const from = ModalAnimation.buildStateFromRect(rect);
        const to = ModalAnimation.getOpenState(isMobile);

        if (supportsAnimate(elem)) {
            const animation = elem.animate([from, to], ModalAnimation.options);

            animation.addEventListener('finish', () => {
                onFinish();

                if ('commitStyles' in animation) {
                    animation.commitStyles();
                    animation.cancel();
                }
            });
        } else {
            ModalAnimation.fallbackAnimation(elem, from, to, onFinish);
        }
    }

    public static animateClose(elem: HTMLElement, rect: DOMRect, isMobile: boolean, onFinish: NoneToVoidFunc): void {
        const from = ModalAnimation.getOpenState(isMobile);
        const to = ModalAnimation.buildStateFromRect(rect);

        if (supportsAnimate(elem)) {
            const animation = elem.animate([from, to], ModalAnimation.options);

            animation.addEventListener('finish', onFinish);
        } else {
            ModalAnimation.fallbackAnimation(elem, from, to, onFinish);
        }
    }

    private static getOpenState(isMobile: boolean): ModalAnimationState {
        return isMobile ? {
            width: '90%',
            height: '480px',
            top: 'calc(50% - 240px)',
            left: '5%',
            opacity: 1,
        } : {
            width: '500px',
            height: '480px',
            top: 'calc(50% - 240px)',
            left: 'calc(50% - 250px)',
            opacity: 1,
        };
    }

    private static buildStateFromRect(rect: DOMRect): ModalAnimationState {
        return {
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            opacity: 0.1,
        };
    }

    private static fallbackAnimation(
        elem: HTMLElement,
        from: ModalAnimationState,
        to: ModalAnimationState,
        onFinish: NoneToVoidFunc
    ): void {
        elem.style.transitionProperty = 'all';
        elem.style.transitionDuration = `${ModalAnimation.options.duration}ms`;
        elem.style.transitionTimingFunction = ModalAnimation.options.easing!;

        for (const [property, value] of objectEntries(from)) {
            elem.style[property] = value as string;
        }

        raf(() => {
            for (const [property, value] of objectEntries(to)) {
                elem.style[property] = value as string;
            }
        });

        const handleTransitionEnd = (e: TransitionEvent) => {
            if (e.target !== elem || e.propertyName !== 'width') {
                return;
            }

            onFinish();

            elem.style.transitionProperty = '';
            elem.style.transitionDuration = '';
            elem.style.transitionTimingFunction = '';

            elem.removeEventListener('transitionend', handleTransitionEnd);
        }

        elem.addEventListener('transitionend', handleTransitionEnd);
    }
}