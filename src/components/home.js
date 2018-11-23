import React, {Component} from 'react';
import {Link} from 'react-router-dom';

function Home(props) {
  return (
    <div>
      <h1>Welcome to the Rental-App</h1>
      <Link to="/tenants">Tenants List</Link>
    </div>
  );
}

export default Home;
