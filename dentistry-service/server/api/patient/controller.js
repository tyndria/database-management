const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

const utils = require('../utils');

function getPatients(res) {
	return oracledb.getPool().getConnection().then(conn => {
		const query = `SELECT PATIENT.ID, PATIENT.FIRST_NAME, PATIENT.LAST_NAME, PATIENT.ADDRESS, PATIENT.BIRTH_DATE, 
		PAYMENT_TYPE.TYPE, PATIENT.PAYMENT_TYPE_ID, PATIENT.DOCTOR_ID, DOCTOR.LAST_NAME AS DOCTOR_LAST_NAME FROM PATIENT 
		INNER JOIN PAYMENT_TYPE ON PATIENT.PAYMENT_TYPE_ID = PAYMENT_TYPE.ID 
		INNER JOIN DOCTOR ON PATIENT.DOCTOR_ID = DOCTOR.ID `;
		return conn.execute(query).then(result => {
			result.metaData = result.metaData.map(column => column.name);
			res.status(200).send(result);
			return conn.release();
		});
	}).catch(err => res.status(500).send(err));
}

function deletePatientsById(res, tableName, ids) {
	return utils.deleteTableRecords(res, tableName, ids);
}

function updatePatientsById(res, tableName, ids) {
	return utils.updateTableRecords(res, tableName, ids);
}

function getPatientsByDay(res) {

}

module.exports = {
	getPatients,
	getPatientsByDay,
	deletePatientsById,
	updatePatientsById
};
