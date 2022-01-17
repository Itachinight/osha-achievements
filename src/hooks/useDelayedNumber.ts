import {useEffect, useRef, useState} from 'react';
import {delay} from '../helpers/delay';

export function useDelayedNumber(num: number) {
    const timeoutRef = useRef<number | undefined>();
    const [delayedValue, setDelayedValue] = useState<number>(0);

    useEffect(() => {
        timeoutRef.current = delay(() => setDelayedValue(num), 50);

        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, [num]);

    return delayedValue;
}