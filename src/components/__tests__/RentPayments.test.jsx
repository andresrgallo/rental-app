import React from 'react';
import {shallow, mount, render} from 'enzyme';
import RentPayments from '../RentPayments';
import {create} from 'react-test-renderer';

describe('RentPayments', function() {
  const tenant = {
    id: '123',
    start_date: '2018-08-09',
    end_date: '2018-12-28',
    rent: 454,
    frequency: 'fortnightly',
    payment_day: 'tuesday',
  };
  const wrapper = shallow(<RentPayments tenant={tenant} />);

  it('renders number of table rows as per number of payments for a Tenant', () => {
    expect(wrapper.find('tr').length).toEqual(11);
  });
  it('renders 44 table tds', () => {
    expect(wrapper.find('td').length).toEqual(44);
  });
  it('renders the first date of the start of tenancy', () => {
    expect(wrapper.contains('August, 9th 2018')).toBe(true);
  });
  it('renders the date of the payment day of the last period of tenancy', () => {
    expect(wrapper.contains('December, 18th 2018')).toBe(true);
    expect(
      wrapper
        .find('tr')
        .last()
        .text(),
    ).toEqual('December, 18th 2018December, 28th 201811$713.4');
  });
});
