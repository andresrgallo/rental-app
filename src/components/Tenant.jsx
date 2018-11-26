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

  //function to generate an array of arrays for all the tenant's history rent plus upcoming payments til end of lease
  rentDates = (startDate, endDate, paymentDay, rent, frequency) => {
    //array to store all dates and payments
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
    //Get the payment day as a number for every frequency-period
    const paymentDayNumber = days.indexOf(paymentDay) + 1;

    //Calculate the days diffence between start lease date and the payment day for the first week, assuming
    //if starting day is not equal to payment day, the payment-frequency-period will start at the next payment day
    //const daysDifference = 7 - startDate.getDay() + paymentDayNumber - 1;
    let initDaysDifference = null;
    if (paymentDayNumber === startDate.getDay()) {
      initDaysDifference = 0;
    } else if (paymentDayNumber > startDate.getDay()) {
      initDaysDifference = paymentDayNumber - startDate.getDay();
    } else {
      initDaysDifference = 7 - startDate.getDay() + paymentDayNumber;
    }

    //Calculate the rent for the first week of tenancy
    const rentFirstWeek =
      initDaysDifference == 0
        ? rent
        : Math.abs((initDaysDifference * rent) / 7).toFixed(1);

    //Calculate the duration of the lease in days
    const leaseDurationDays =
      Math.round(
        Math.abs(
          (startDate.getTime() - endDate.getTime()) / (24 * 60 * 60 * 1000),
        ),
      ) + 1;

    //Get the payment-frequency in days to calculate the qty of payments for the whole lease duration
    let frequencyDays = null;
    if (frequency === 'weekly') {
      frequencyDays = 7;
    } else if (frequency === 'fortnightly') {
      frequencyDays = 14;
    } else if (frequency === 'monthly') {
      frequencyDays = 28;
    } else {
      console.log(
        'Payment frequency has to be weekly or fortnightly or monthly',
      );
    }

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

    //Append first "frequency-period" payment details to dates array
    if (initDaysDifference !== 0) {
      dates.push([
        prettyDate(startDate),
        prettyDate(this.addDays(startDate, initDaysDifference - 1)),
        rentFirstWeek,
      ]);
    } else {
      dates.push([
        prettyDate(startDate),
        prettyDate(this.addDays(startDate, 6)),
        rent,
      ]);
    }

    //Loop
    const firstCompletePeriodDate = this.addDays(startDate, initDaysDifference);
    const endFirstPeriodDate = this.addDays(
      firstCompletePeriodDate,
      frequencyDays - 1,
    );
    for (
      let i = 0;
      i < parseInt((leaseDurationDays - initDaysDifference) / frequencyDays);
      i++
    ) {
      dates.push([
        prettyDate(this.addDays(firstCompletePeriodDate, i * frequencyDays)),
        prettyDate(this.addDays(endFirstPeriodDate, i * frequencyDays)),
        rent,
      ]);
    }

    //Append last "frequency-period" payment details to dates array if end day is different from payment day
    if (paymentDayNumber !== endDate.getDay()) {
      const lastDaysDifference =
        (leaseDurationDays - initDaysDifference) % frequencyDays;
      const startLastWeek = this.addDays(endDate, -lastDaysDifference + 1);
      const lastPaymentDate = this.addDays(endDate, -lastDaysDifference);
      const lastPayment = ((rent / 7) * lastDaysDifference).toFixed(1);
      dates.push([prettyDate(startLastWeek), prettyDate(endDate), lastPayment]);
    }
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
    //var startDate = new Date('2018,08,02');
    var startDate = new Date('2018,08,09');
    const monthnames = [
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
    const startDayWord = startDate.getDay();
    const endDate = new Date('2018,12,28');
    const paymentDay = tenant.payment_day;
    const {id, rent, frequency} = tenant;
    const newDate = this.addDays(startDate, 5);
    console.log('start day', startDayWord);
    console.log('newdate', newDate);
    //const test = this.rentDates(startDate, endDate, 'monday', 700, 'weekly');
    const test = this.rentDates(
      startDate,
      endDate,
      'tuesday',
      510,
      'fortnightly',
    );
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
              <td />
              <td />
              <td>days ....</td>
              <td>{rent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
