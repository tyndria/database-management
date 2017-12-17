import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import NavPanel from './navpanel/NavPanel';

class App extends Component {
	constructor() {
		super();

		this.state = {
			route: 'Clients'
		}
	}

	navPanelItemChange = item => {
		console.log(item);
		if (item !== this.state.route) {
			this.setState({ route: item });
		}
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<div className="main-container">
					<NavPanel onMenuClick={this.navPanelItemChange}></NavPanel>
					<div class="content">
						<p className="App-intro">
							To get started, edit <code>src/App.js</code> and save to reload.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
