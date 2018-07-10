import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Transaction from './transaction';
import { COUNTRY_CURRENCY_CODE, CURRENCY_FORMAT_OPTIONS } from '../constants';

Enzyme.configure({ adapter: new Adapter() });

let transaction;

describe('Transaction component', () => {
  beforeEach(() => {
    transaction = {
      name: 'ZOPA',
      email: 'zopa@zopa.de',
      amountTransferred: 5000,
    }
  });

  test('should render', () => {
    const wrapper = shallow(
      <Transaction transaction={transaction} />
    );

    expect(wrapper.prop('className')).toEqual('transaction');
  });

  test('should render same snapshot', () => {
    const wrapper = renderer.create(
      <Transaction transaction={transaction} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('should render transaction details', () => {
    const wrapper = shallow(
      <Transaction transaction={transaction} />
    );

    expect(wrapper.find('.name').text()).toEqual(transaction.name);
    expect(wrapper.find('.email').text()).toEqual(transaction.email);
    expect(wrapper.find('.amount').text()).toEqual(
      transaction.amountTransferred.toLocaleString(COUNTRY_CURRENCY_CODE, CURRENCY_FORMAT_OPTIONS)
    );
  });
});
