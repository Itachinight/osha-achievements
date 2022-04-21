import React from 'react';
import {createRoot} from "react-dom/client";
import App from './components/App';
import Modal from 'react-modal';
import {Provider} from 'react-redux';

import {store} from './redux';

import './scss/main.scss';

const rootElement = document.getElementById('root')!;

Modal.setAppElement(rootElement);

createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
);