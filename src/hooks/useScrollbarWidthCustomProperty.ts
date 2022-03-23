import {useScrollbarWidth} from 'react-use';
import {useLayoutEffect} from 'react';

export function useScrollbarWidthCustomProperty(propertyName: string): void {
    const scrollbarWidth = useScrollbarWidth();

    useLayoutEffect(() => {
        document.documentElement.style.setProperty(propertyName, scrollbarWidth != null ? `${scrollbarWidth}px` : '0');
    }, [propertyName, scrollbarWidth]);
}