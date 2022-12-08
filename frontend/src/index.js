import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from './store';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

Kommunicate.init("3fb022ac489c7937adc5aca16ce8173c4")


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();