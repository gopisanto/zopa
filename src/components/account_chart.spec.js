import React from 'react';
import renderer from 'react-test-renderer';

import AccountChart from './account_chart';

describe('AccountChart component', () => {
  test('should render correctly based on totalSent and totalLeft amount.', () => {
    const component = renderer.create(
      <AccountChart totalLeft={98000} totalSent={2000} />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
})
