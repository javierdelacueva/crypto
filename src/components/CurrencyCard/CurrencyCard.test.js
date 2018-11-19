import React from 'react';
import { shallow } from 'enzyme';
import CurrencyCard from './CurrencyCard';

describe('<CurrencyCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<CurrencyCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
