import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('app');
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter basename={baseUrl} >
            <App />
        </BrowserRouter>
    </Provider>,
    rootElement
)