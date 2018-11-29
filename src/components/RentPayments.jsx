import React, { Component } from 'react';

export default class RentPayments extends Component {
	//Function to add days to dates, use minus to substract.
	addDays = (theDate, days) => {
		return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
	};

	//Function to add st, nd, rd or th to dates
	addSuffix = theDate => {
		const dayNum = theDate.getDate();
		let suffix;
		switch (dayNum) {
			case 1:
				suffix = 'st';
				break;
			case 2:
				suffix = 'nd';
				break;
			case 3:
				suffix = 'rd';
				break;
			case 21:
				suffix = 'st';
				break;
			case 22:
				suffix = 'nd';
				break;
			case 23:
				suffix = 'rd';
				break;
			case 31:
				suffix = 'st';
				break;
			default:
				suffix = 'th';
		}
		return suffix;
	};

	//Function to generate an array of arrays for all the tenants history rent plus upcoming payments until the end of the lease
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
			'sunday'
		];

		//Get the payment day as a number for every frequency-period
		const paymentDayNumber = days.indexOf(paymentDay) + 1;

		//Calculate the days diffence between the start of the lease and the payment day for the first week, when
		//the payment day is different from the lease start day.
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
			initDaysDifference === 0
				? rent
				: Math.abs((initDaysDifference * rent) / 7).toFixed(1);

		//Calculate the duration of the lease in days
		const leaseDurationDays =
			Math.round(
				Math.abs(
					(startDate.getTime() - endDate.getTime()) / (24 * 60 * 60 * 1000)
				)
			) + 1;

		//Get the payment-frequency in days to calculate the qty of complete period payments, for the whole lease duration
		let frequencyDays = '';
		if (frequency === 'weekly') {
			frequencyDays = 7;
		} else if (frequency === 'fortnightly') {
			frequencyDays = 14;
		} else if (frequency === 'monthly') {
			frequencyDays = 28;
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
				'December'
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
		if (initDaysDifference > 0) {
			initDaysDifference === 1
				? dates.push([
						prettyDate(startDate),
						prettyDate(startDate),
						initDaysDifference,
						rentFirstWeek
				  ])
				: dates.push([
						prettyDate(startDate),
						prettyDate(this.addDays(startDate, initDaysDifference - 1)),
						initDaysDifference,
						rentFirstWeek
				  ]);
		} else {
			dates.push([
				prettyDate(startDate),
				prettyDate(this.addDays(startDate, 6)),
				rent
			]);
		}

		//Loop to append complete rent periods to the dates array
		const firstCompletePeriodDate = this.addDays(startDate, initDaysDifference);
		const endFirstPeriodDate = this.addDays(
			firstCompletePeriodDate,
			frequencyDays - 1
		);
		for (
			let i = 0;
			i < parseInt((leaseDurationDays - initDaysDifference) / frequencyDays);
			i++
		) {
			dates.push([
				prettyDate(this.addDays(firstCompletePeriodDate, i * frequencyDays)),
				prettyDate(this.addDays(endFirstPeriodDate, i * frequencyDays)),
				frequencyDays,
				(rent / 7) * frequencyDays
			]);
		}

		//Append last "frequency-period" payment details to dates array if end day is different from payment day
		if (paymentDayNumber !== endDate.getDay()) {
			const lastDaysDifference =
				(leaseDurationDays - initDaysDifference) % frequencyDays;
			const startLastWeek = this.addDays(endDate, -lastDaysDifference + 1);
			const lastPayment = ((rent / 7) * lastDaysDifference).toFixed(1);
			dates.push([
				prettyDate(startLastWeek),
				prettyDate(endDate),
				lastDaysDifference,
				lastPayment
			]);
		} else if (paymentDayNumber === endDate.getDay()) {
			dates.push([
				prettyDate(endDate),
				prettyDate(endDate),
				1,
				((rent / 7) * 1).toFixed(1)
			]);
		}
		return dates;
	};

	render() {
		const { tenant } = this.props;
		const startDate = new Date(tenant.start_date);
		const endDate = new Date(tenant.end_date);
		const paymentDay = tenant.payment_day;
		const { rent, frequency } = tenant;
		const rentalPayments = this.rentDates(
			startDate,
			endDate,
			paymentDay,
			rent,
			frequency
		);
		const list = rentalPayments.map((period, index) => (
			<tr key={index}>
				<td>{period[0]}</td>
				<td>{period[1]}</td>
				<td>{String(period[2])}</td>
				<td>${period[3]}</td>
			</tr>
		));

		return <React.Fragment>{list}</React.Fragment>;
	}
}
