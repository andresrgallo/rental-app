import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Import components
import Home from './components/home';
//import {Tenants} from './components/tenants/tenants';
//import {Tenant} from './components/tenant/tenant';
//import {NotFound} from './components/notfound/notfound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
