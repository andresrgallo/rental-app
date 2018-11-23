import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Import components
import Home from './components/Home';
import Tenants from './components/Tenants';
//import {Tenant} from './components/Tenant/Tenant';
import NotFound from './components/NotFound';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tenants" component={Tenants} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

//<Route  path="/tenant/:id" component={Tenant} />
