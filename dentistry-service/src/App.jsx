import React, {Component} from 'react';
import './App.css';

import NavPanel from './navpanel/NavPanel';
import EditableTable from './table/Table';

class App extends Component {
	constructor() {
		super();

		this.state = {
			route: 'Services'
		}
	}

	navPanelItemChange = item => {
		if (item !== this.state.route) {

			this.setState({ route: item });
		}
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Dentistry Service</h1>
				</header>
				<div className="main-container">
					<NavPanel onMenuClick={this.navPanelItemChange}></NavPanel>
					<div className="content">
						<div className="table-name">
							{this.state.route}
						</div>
						{ this.state.route === 'Patients Details' ?
							<div className="details-remark">* Patients, that haven't been serviced yet not by their doctor</div> : '' }
						<EditableTable tableName={this.state.route}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
