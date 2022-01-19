import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import Modal from 'react-modal';

import './scss/main.scss';

const root = document.getElementById('root')!;

Modal.setAppElement(root);

render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    root
);