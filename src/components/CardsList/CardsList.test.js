import React from 'react';
import { shallow } from 'enzyme';
import CardsList from './CardsList';

describe('<CardsList />', () => {
  test('renders', () => {
    const wrapper = shallow(<CardsList />);
    expect(wrapper).toMatchSnapshot();
  });
});
