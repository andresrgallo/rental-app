import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Tenants from '../Tenants';
import {create} from 'react-test-renderer';

describe('Tenants', function() {
  const wrapper = shallow(<Tenants />);
  it('renders h2 Tenants page title', () => {
    expect(wrapper.find('h2').text()).toEqual('List Of Tenants');
  });
  it('renders a Table', () => {
    const wrapper = shallow(<Tenants />);
    expect(wrapper.find('table').length).toEqual(1);
  });
  it('renders the headers', () => {
    const texts = wrapper.find('th').map(node => node.text());
    expect(texts).toEqual(['Lease ID', 'Name']);
  });
});
