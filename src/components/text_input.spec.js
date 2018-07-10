import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { cloneDeep } from 'lodash';

import TextInput from './text_input';
import { REQUIRED_FIELD, ONLY_ALPHABETS } from '../validations';

Enzyme.configure({ adapter: new Adapter() });

const noop = () => null;

describe('TextInput component', () => {
  test('should render without error', () => {
    const field = {
      meta: {
        touched: false,
        error: undefined,
        active: false,
      },
      name: 'name',
      label: 'Name',
      type: 'text',
      input: {value: "ZOPA", name: "name", onChange: noop}
    };
    const component = renderer.create(
      <TextInput field={field} />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('should render with matching error messages based on text input value', () => {
    const fieldWithEmptyValue = {
      meta: {
        touched: true,
        error: REQUIRED_FIELD,
        active: false,
      },
      name: 'name',
      label: 'Name',
      type: 'text',
      input: {value: "", name: "name", onChange: noop},
    };
    const component = mount(<TextInput field={fieldWithEmptyValue} />);
    let fieldWithInvalidChars = cloneDeep(fieldWithEmptyValue);
    fieldWithInvalidChars.meta.error = ONLY_ALPHABETS;
    fieldWithInvalidChars.input.value = '@santosh-kumar';
    const component1 = mount(<TextInput field={fieldWithInvalidChars} />);

    expect(component.find('span').text()).toBe(REQUIRED_FIELD);
    expect(component1.find('span').text()).toBe(ONLY_ALPHABETS);
  });

  test('should render with error message', () => {
    const field = {
      meta: {
        touched: true,
        error: REQUIRED_FIELD,
        active: false,
      },
      name: 'name',
      label: 'Name',
      type: 'text',
      input: {value: "", name: "name", onChange: noop},
    };
    const component = renderer.create(
      <TextInput field={field} />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
