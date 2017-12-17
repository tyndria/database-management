const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

const utils = require('../utils');

function getVisits(res) {
	return oracledb.getPool().getConnection().then(conn => {
		const query = `SELECT VISIT.ID, VISIT.VISIT_DATE, DOCTOR.LAST_NAME AS DOCTOR_LAST_NAME,  
		PATIENT.LAST_NAME AS PATIENT_LAST_NAME, VISIT.PATIENT_ID, VISIT.DOCTOR_ID FROM VISIT 
		INNER JOIN PATIENT ON PATIENT.ID = VISIT.PATIENT_ID 
		INNER JOIN DOCTOR ON VISIT.DOCTOR_ID = DOCTOR.ID`;
		return conn.execute(query).then(result => {
			result.metaData = result.metaData.map(column => column.name);
			res.status(200).send(result);
			return conn.release();
		});
	}).catch(err => res.status(500).send(err));
}


module.exports = {
	getVisits: getVisits
};
