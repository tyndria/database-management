import axios from 'axios';

const ROOT_URL = '/api/';
const TABLE_NAMES = {
	'Patients': 'patient',
	'Doctors': 'doctor',
	'Visits': 'visit',
	'Services': 'service',
	'Monthly Revenue': 'patient'
};

const editableColumns = {
	'Patients': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS']
};

const visibleColumns = {
	'Patients': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS', 'BIRTH_DATE', 'DOCTOR_LAST_NAME', 'TYPE']
};

function getTableRecords(name) {
	return axios.get(`${ROOT_URL}/${TABLE_NAMES[name]}`).then(res => {
		return mapData(res, name);
	}, err => {
		/* TODO: handle errors appropriately */
		console.log('error: ' + err);
	});
}

function updateTableRecords(name, rows, rowsToUpdate) {
	return axios.put(`${ROOT_URL}${TABLE_NAMES[name]}`, {rowsToUpdate}).then(res => {
		return mapData(res, name);
		}, err => {
			/* TODO: handle errors appropriately */
			console.log('error: ' + err);
		});
}

function mapData(res, name) {
	const result = {};
	const columns = res.data.metaData;
	const rows = res.data.rows;
	result.columns = columns.filter((column) => {
		return visibleColumns[name].includes(column);
	}).map(column => ({
		key: column,
		name: column,
		editable: editableColumns[name].includes(column)
	}));

	result.rows = rows.map((row) => {
		const resRow = {};
		row.forEach((cell, index) => {
			resRow[columns[index]] = cell;
		});
		return resRow;
	});
	return result;
}

const TableService = () => {
	return {
		getTableRecords: getTableRecords,
		updateTableRecords: updateTableRecords
	}
};

export default TableService;