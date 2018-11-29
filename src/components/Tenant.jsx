import React, { Component } from 'react';
import RentPayments from './RentPayments';
import './css/Tenant.css';

export default class Tenant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenant: []
		};
	}

	//Fetch the data for individual tenants from API
	componentDidMount() {
		//Access the url
		var url = window.location.href;
		//Get the lease id
		let leaseId = url.split('=')[1];
		fetch(`https://hiring-task-api.herokuapp.com/v1/leases/${leaseId}`)
			.then(res => res.json())
			.then(tenant => {
				this.setState({ tenant });
			})
			.catch(e => console.log(e));
	}

	render() {
		const { tenant } = this.state;
		const { id } = tenant;
		return (
			<div className="tenant-container">
				<h2 id="tenant-title">Payment Schedule For Lease Id - {id}</h2>

				<table id="tenant-table">
					<thead>
						<tr>
							<th>From</th>
							<th>To</th>
							<th>Days</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						<RentPayments tenant={tenant} />
					</tbody>
				</table>
			</div>
		);
	}
}
