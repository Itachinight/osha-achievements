export class ModalAnimation {
    private static options: KeyframeAnimationOptions = {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    };

    public static animateOpen(elem: Element, rect: DOMRect, isMobile: boolean = false): Animation {
        return elem.animate(
            [
                {
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${rect.top}px`,
                    left: `${rect.left}px`,
                    opacity: 0.25,
                },
                isMobile ? {
                    width: '90%',
                    height: '450px',
                    top: 'calc(50% - 225px)',
                    left: '5%',
                    opacity: 1,
                } : {
                    width: '600px',
                    height: '450px',
                    top: 'calc(50% - 225px)',
                    left: 'calc(50% - 300px)',
                    opacity: 1,
                },
            ],
            ModalAnimation.options
        );
    }

    public static animateClose(elem: Element, rect: DOMRect): Animation {
        return elem.animate(
            [
                {
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${rect.top}px`,
                    left: `${rect.left}px`,
                    opacity: 0.25
                }
            ],
            ModalAnimation.options
        )
    }
}