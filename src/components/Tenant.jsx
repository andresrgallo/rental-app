import React, {Component} from 'react';

export default class Tenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: [],
    };
  }

  //Function to calculate end of the rental frequency period -weekly or fortnightly
  addDays = (theDate, days) => {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  };

  //Function to add st, nd, rd or th to dates
  addSuffix = theDate => {
    const day = theDate.getDate();
    let suffix;
    switch (day) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
    return suffix;
  };

  rentDates = (startDate, endDate, paymentDay, rent) => {
    let dates = [];
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const paymentDayNumber = days.indexOf(paymentDay) + 1;

    //Calculate the days diffence between start lease date and the payment day for the first week, sunday = 0
    const daysDifference = startDate.getDay() - (paymentDayNumber + 1);

    //Calculate the rent for the first week of tenancy
    const rentFirstWeek =
      daysDifference == 0
        ? rent
        : Math.abs((daysDifference * rent) / 7).toFixed(1);
    console.log('days diff', daysDifference);
    const endDateFirstWeek = this.addDays(startDate, daysDifference);

    //function to print dates in a pretty way
    const prettyDate = date => {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const theDate =
        monthNames[date.getMonth()] +
        ', ' +
        date.getDate() +
        this.addSuffix(date) +
        ' ' +
        date.getFullYear();
      return theDate;
    };

    dates.push([
      prettyDate(startDate),
      prettyDate(endDateFirstWeek),
      rentFirstWeek,
    ]);
    return dates;
  };

  //Fetch the data for individual tenants from API
  componentDidMount() {
    const {id} = this.props.match.params;
    fetch(`https://hiring-task-api.herokuapp.com/v1/leases/${id}`)
      .then(res => res.json())
      .then(tenant => {
        console.log(tenant);
        this.setState({tenant});
      })
      .catch(e => console.log(e));
  }

  render() {
    const {tenant} = this.state;
    const startDate = new Date(tenant.start_date);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    //Assign Year, Month, Days to constants to display at view or to user for calculations
    //const startMonth = monthNames[startDate.getMonth()];
    const startLeaseDate =
      monthNames[startDate.getMonth()] +
      ', ' +
      startDate.getDate() +
      ' ' +
      this.addSuffix(startDate) +
      ' ' +
      startDate.getFullYear();
    //const startDay = startDate.getDate() + this.addSuffix(startDate);
    const startDayWord = startDate.getDay();
    //const startYear = startDate.getFullYear();
    const endDate = new Date(tenant.end_date);
    const endMonth = monthNames[endDate.getMonth()];
    const paymentDay = tenant.payment_day;
    const {id, rent, frequency} = tenant;
    const newDate = this.addDays(startDate, 5);
    console.log('start day', startDayWord);
    console.log('newdate', newDate);
    const test = this.rentDates(startDate, endDate, paymentDay, rent);
    console.log('test', test);

    return (
      <div>
        <h2>Payment schedule for lease-id #{id} </h2>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{startLeaseDate}</td>
              <td>{endMonth}</td>
              <td>days ....</td>
              <td>{rent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
