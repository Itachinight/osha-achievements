export function animateElementHeight(element: Element, start: number, end: number): Animation {
    return element.animate(
        [
            {height: `${start}px`},
            {height: `${end}px`}
        ],
        {duration: 600, easing: 'linear'}
    );
}