import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import { Provider } from 'react-redux';
import Store from './Store';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <Provider store={Store}>
      <App />
  </Provider>,
  document.getElementById('root')
);