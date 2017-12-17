const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

function getClients(res) {
	oracledb.getPool().getConnection().then(conn => {
		return conn.execute('SELECT * FROM PATIENT').then(result => {
			console.log(result);
			const columns = result.metaData.map(column => column.name);
			result = result.rows.reduce((prev, curr) => {
				let option = {};
				columns.forEach((col, index) => {
					option[col] = curr[index];
				});
				for (let i = 0; i < columns.length; i++) {
					option[columns[i]] = curr[i];
				}
				prev.push(option);
				return prev;
			}, []);
			res.status(200).send(result);
			return conn.release();
		});
	}).catch(err => {res.status(500).send(err); console.log(err)});
}

function getClientsByDay(res) {

}

module.exports = {
	getClients,
	getClientsByDay
};
