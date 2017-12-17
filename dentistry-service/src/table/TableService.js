import axios from 'axios';

const ROOT_URL = '/api/';
const ROUTES_NAMES = {
	'Patients': 'patient',
	'Doctors': 'doctor',
	'Visits': 'visit',
	'Services': 'service',
	'Monthly Revenue': 'revenue',
	'Patients Details': 'patientDetails'
};

const editableColumns = {
	'Patients': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS'],
	'Doctors': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS'],
	'Services': ['TITLE', 'COST'],
	'Visits': [],
	'Monthly Revenue': [],
	'Patients Details': []
};

const visibleColumns = {
	'Patients': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS', 'BIRTH_DATE', 'DOCTOR_LAST_NAME', 'TYPE'],
	'Doctors': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS'],
	'Services': ['TITLE', 'COST'],
	'Visits': ['VISIT_DATE', 'PATIENT_LAST_NAME', 'DOCTOR_LAST_NAME'],
	'Monthly Revenue': ['SUM', 'MONTH'],
	'Patients Details': ['FIRST_NAME', 'LAST_NAME', 'ADDRESS', 'BIRTH_DATE']
};

function getTableRecords(name) {
	return axios.get(`${ROOT_URL}/${ROUTES_NAMES[name]}`).then(res => {
		return mapData(res, name);
	}, err => {
		/* TODO: handle errors appropriately */
		console.log('error: ' + err);
	});
}

function updateTableRecords(name, rowsToUpdate) {
	return axios.put(`${ROOT_URL}${ROUTES_NAMES[name]}`, {rowsToUpdate}).then(res => {
		return mapData(res, name);
		}, err => {
			/* TODO: handle errors appropriately */
			console.log('error: ' + err);
		});
}

function deleteTableRecords(name, rowsToDelete) {
	return axios.delete(`${ROOT_URL}${ROUTES_NAMES[name]}`, {params: {rowsToDelete}}).then(res => {
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
		updateTableRecords: updateTableRecords,
		deleteTableRecords: deleteTableRecords
	}
};

export default TableService;