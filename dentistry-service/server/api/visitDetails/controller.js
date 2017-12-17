const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

function getVisitPatients(res, date) {
	return oracledb.getPool().getConnection().then(conn => {
		const query = `SELECT PATIENT.FIRST_NAME, PATIENT.LAST_NAME, PATIENT.ADDRESS, PATIENT.BIRTH_DATE
					   FROM PATIENT JOIN VISIT ON VISIT.PATIENT_ID = PATIENT.ID
					   WHERE VISIT.VISIT_DATE = TO_DATE('${date}', 'MM-DD-YYYY')`;
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
	getVisitPatients
};
