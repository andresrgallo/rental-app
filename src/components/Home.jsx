import React from 'react';
import {Link} from 'react-router-dom';

export default function Home(props) {
  return (
    <div>
      <h1>Welcome to the Rental-App</h1>
      <Link to="/leases">Tenants List</Link>
    </div>
  );
}
