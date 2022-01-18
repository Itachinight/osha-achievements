import {useEffect, useRef, useState} from 'react';
import {delay} from '../helpers/delay';

export function useDelayedValue<T>(value: T, initial: T, timeout: number = 1000 / 30) {
    const timeoutRef = useRef<number | undefined>();
    const [delayedValue, setDelayedValue] = useState<T>(initial);

    useEffect(() => {
        timeoutRef.current = delay(() => setDelayedValue(value), timeout);

        return () => window.clearTimeout(timeoutRef.current);
    }, [timeout, value]);

    return delayedValue;
}