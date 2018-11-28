import React from 'react';
import {shallow, mount, render} from 'enzyme';
import NavBar from '../NavBar';
import {create} from 'react-test-renderer';

describe('NavBar', function() {
  const wrapper = shallow(<NavBar />);
  it('renders an Icon', () => {
    expect(wrapper.find('ion-icon').length).toEqual(1);
  });
  it('renders a two nav links', () => {
    expect(wrapper.find('NavLink').length).toEqual(2);
  });
  it('renders the companies name', () => {
    expect(wrapper.find('span').text()).toEqual('Unique Rentals');
  });
});
