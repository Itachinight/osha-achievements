import React from 'react';
import {render} from 'react-dom';
import './css/style.scss';
import App from './components/App';
import Modal from 'react-modal';

const root = document.getElementById('root')!;

Modal.setAppElement(root);

render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    root
);