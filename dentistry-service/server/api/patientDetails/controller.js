const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

function getPatientDetails(res) {
	return oracledb.getPool().getConnection().then(conn => {
		const query = `SELECT DISTINCT PATIENT.ID, PATIENT.FIRST_NAME, PATIENT.LAST_NAME, PATIENT.ADDRESS FROM PATIENT
					   JOIN VISIT ON VISIT.PATIENT_ID = PATIENT.ID
					   WHERE PATIENT.ID NOT IN
					   (SELECT PATIENT.ID FROM PATIENT JOIN VISIT ON VISIT.PATIENT_ID = PATIENT.ID
					   WHERE VISIT.DOCTOR_ID != PATIENT.DOCTOR_ID) `;
		return conn.execute(query).then(result => {
			result.metaData = result.metaData.map(column => column.name);
			console.log(result);
			res.status(200).send(result);
			return conn.release();
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({message: err.message});
	});
}


module.exports = {
	getPatientDetails
};
