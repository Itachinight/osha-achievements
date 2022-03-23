import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import Modal from 'react-modal';
import {Provider} from 'react-redux';

import {store} from './redux';

import './scss/main.scss';

const root = document.getElementById('root')!;

Modal.setAppElement(root);

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    root
);