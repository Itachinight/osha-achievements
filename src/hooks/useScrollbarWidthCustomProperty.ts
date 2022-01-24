import {useScrollbarWidth} from 'react-use';
import {useEffect} from 'react';

const SCROLLBAR_WIDTH_PROPERTY_NAME = '--scrollbar-width';

export function useScrollbarWidthCustomProperty(): void {
    const scrollbarWidth = useScrollbarWidth();

    useEffect(() => {
        document.documentElement.style.setProperty(
            SCROLLBAR_WIDTH_PROPERTY_NAME,
            scrollbarWidth != null ? `${scrollbarWidth}px` : '0'
        );
    }, [scrollbarWidth]);
}