const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

function getMonthRevenue(res) {
	return oracledb.getPool().getConnection().then(conn => {
		const query = `SELECT SUM(SERVICE.COST) AS SUM, EXTRACT(month FROM VISIT.VISIT_DATE) AS MONTH FROM VISIT_SERVICE 
					   JOIN VISIT ON VISIT_SERVICE.VISIT_ID = VISIT.ID 
					   JOIN SERVICE ON VISIT_SERVICE.SERVICE_ID = SERVICE.ID 
					   WHERE EXTRACT(year FROM VISIT.VISIT_DATE) = EXTRACT(year FROM SYSDATE) 
					   GROUP BY EXTRACT(month FROM VISIT.VISIT_DATE) `;
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
	getMonthRevenue
};
