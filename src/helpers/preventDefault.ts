import {ReactEventHandler} from 'react';

export const preventDefault: ReactEventHandler = (event) => {
    event.preventDefault();
}