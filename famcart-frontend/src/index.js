import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import configureStore from './store';
import { loadUserFromLocalStorage } from './store/auth'; // Import the action
import App from './App';
import './index.css';

const store = configureStore();

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return <App />;
}

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  document.getElementById('root')
);
