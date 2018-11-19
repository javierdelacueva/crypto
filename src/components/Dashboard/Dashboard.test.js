import React from 'react';
import { shallow } from 'enzyme';
import CurrencyCard from './Dashboard';

describe('<CurrencyCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<CurrencyCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
