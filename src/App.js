import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import NotFound from './components/NotFound';

//Import components using lazy routing
const Home = asyncComponent(() =>
	import('./components/Home').then(module => {
		//console.log(module.default);
		return module.default;
	})
);
const Tenants = asyncComponent(() =>
	import('./components/Tenants').then(module => module.default)
);
const Tenant = asyncComponent(() =>
	import('./components/Tenant').then(module => module.default)
);
const NavBar = asyncComponent(() =>
	import('./components/NavBar').then(module => module.default)
);
//const NotFound = asyncComponent(() =>
//	import('./components/NotFound').the(module => module.default)
//);

export default class App extends Component {
	render() {
		return (
			<Router>
				<div className="app-container">
					<NavBar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/leases" component={Tenants} />
						<Route exact path="/leases.html" component={Tenant} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}
