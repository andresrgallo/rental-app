import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Import components
import Home from './components/Home';
import Tenants from './components/Tenants';
import Tenant from './components/Tenant';
import NotFound from './components/NotFound';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/leases" component={Tenants} />
          <Route exact path="/leases.html" component={Tenant} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
