import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Transactions from './transactions';
import reducer from '../reducers';
import { ADD_TRANSACTION } from '../actions';

Enzyme.configure({ adapter: new Adapter() });

let store;

describe('Transactions component', () => {
  beforeEach(() => {
    store = createStore(reducer);
  });

  test('should render nothing when no transactions', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );
    expect(wrapper.find('.lbl-no-transactions').text()).toEqual('No transactions.');
  });

  test('should render same snapshot when no transactions', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Transactions />
      </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('should render transactions', () => {
    const transactions = [
      {
        name: 'ZOPA',
        email: 'zopa@gmail.com',
        amountTransferred: 1000,
      },
      {
        name: 'ZOPA1',
        email: 'zopa@zopa.de',
        amountTransferred: 4500,
      }
    ];

    store.dispatch({
      type: ADD_TRANSACTION,
      payload: transactions[0],
    });

    store.dispatch({
      type: ADD_TRANSACTION,
      payload: transactions[1],
    });

    const wrapper = mount(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    expect(wrapper.find('.transaction').length).toEqual(transactions.length);
  });

  test('should render same snapshot when some transactions', () => {
    const transactions = [
      {
        name: 'ZOPA',
        email: 'zopa@gmail.com',
        amountTransferred: 1000,
      },
      {
        name: 'ZOPA1',
        email: 'zopa@zopa.de',
        amountTransferred: 4500,
      }
    ];

    store.dispatch({
      type: ADD_TRANSACTION,
      payload: transactions[0],
    });

    store.dispatch({
      type: ADD_TRANSACTION,
      payload: transactions[1],
    });

    const component = renderer.create(
      <Provider store={store}>
        <Transactions />
      </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
