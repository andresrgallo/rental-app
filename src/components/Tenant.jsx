import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RentPayments from './RentPayments';

export default class Tenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: [],
    };
  }

  //Fetch the data for individual tenants from API
  componentDidMount() {
    //Access the url
    var url = window.location.href;
    //Get the lease id
    let leaseId = url.split('=')[1];
    console.log('loc', this.props.location);
    const {id} = this.props.match.params;
    fetch(`https://hiring-task-api.herokuapp.com/v1/leases/${leaseId}`)
      .then(res => res.json())
      .then(tenant => {
        this.setState({tenant});
      })
      .catch(e => console.log(e));
  }

  render() {
    const {tenant} = this.state;
    const {id} = tenant;

    return (
      <div>
        <div>
          <Link to="/">Home Page</Link> | <Link to="/leases">Tenants List</Link>
        </div>
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
              <RentPayments tenant={tenant} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
