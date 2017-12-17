import React from 'react';
import { PropTypes } from 'prop-types';

import './NavPanel.css';

const links = ['Patients', 'Patients Details', 'Doctors', 'Visits', 'Services', 'Monthly Revenue'];

const NavPanel = props =>
	<div className="navpanel">
		{getMenuItems(props.onMenuClick)}
	</div>;

function getMenuItems(clickCallback) {
	return links.map(item =>
		<div
			key={item}
			className="navpanel-item"
			onMouseDown={() => clickCallback(item)}>
			<span>
				{item}
			</span>
		</div>
	);
}

NavPanel.propTypes = {
	onMenuClick: PropTypes.func.isRequired
};

export default NavPanel;