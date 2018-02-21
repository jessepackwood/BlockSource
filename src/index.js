import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import Store from './store';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <Provider store={Store}>
      <App />
  </Provider>,
  document.getElementById('root')
);