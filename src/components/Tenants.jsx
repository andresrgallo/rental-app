import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Tenants.css';

export default class Tenants extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenants: []
		};
	}

	//Fetch data for all Tenants from API
	componentDidMount() {
		fetch('https://hiring-task-api.herokuapp.com/v1/leases')
			.then(res => res.json())
			.then(tenants => {
				this.setState({ tenants });
			})
			.catch(e => console.log(e));
	}

	render() {
		const { tenants } = this.state;
		const list = tenants.map((t, index) => (
			<tr key={index}>
				<td>
					<Link to={'/leases.html?leaseId=' + (index + 1)}>{t.id}</Link>
				</td>
				<td>{t.tenant}</td>
			</tr>
		));

		return (
			<div className="tenants-container">
				<div className="wrapper">
					<h2 id="title">List Of Tenants</h2>
					<table id="tenants-table">
						<thead id="tenants-head">
							<tr>
								<th>Lease ID</th>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>{list}</tbody>
					</table>
				</div>
			</div>
		);
	}
}
