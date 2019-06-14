import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import App from './components/app';
import Update from './components/update';
import Create from './components/create';
import Read from './components/read';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path = '/' component={App} />
			<Route exact path = '/update/:id' component={Update} />
			<Route exact path = '/create' component={Create} />
			<Route exact path = '/read/:id' component={Read} />
		</div>
	</Router>
	,document.querySelector("#root"));