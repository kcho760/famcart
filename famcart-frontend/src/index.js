import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import configureStore from './store'; // Import your store configuration
import App from './App'; // Import your main component
import './index.css';

const store = configureStore(); // Create the Redux store

ReactDOM.render(
  <Provider store={store}> {/* Wrap your app with Provider and pass the store */}
    <App />
  </Provider>,
  document.getElementById('root')
);
