import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import SendMoney from './send_money';

Enzyme.configure({ adapter: new Adapter() });

let store;

describe('SendMoney form component', () => {
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
  });

  test('should render', () => {
		const wrapper = renderer.create(
      <Provider store={store}>
        <SendMoney />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
