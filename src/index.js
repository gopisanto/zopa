import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import SendMoney from './components/send_money';
import Transactions from './components/transactions';
import reducer from './reducers';

import '../style/style.scss';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
/* eslint-enable */

const App = () => (
  <div className="app">
    <SendMoney />
    <Transactions />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
