const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

module.exports = {
	getTableRecords,
	updateTableRecords,
	deleteTableRecords
};

function getTableRecords(res, tableName) {
	return oracledb.getPool().getConnection().then(conn => {
		const query = `SELECT * FROM ${tableName}`;
		return conn.execute(query).then(result => {
			result.metaData = result.metaData.map(column => column.name);
			res.status(200).send(result);
			return conn.release();
		});
	}).catch(err => res.status(500).send(err));
}

function updateTableRecords(res, tableName, tableRows) {
	return oracledb.getPool().getConnection().then(conn => {
		let query = `SELECT COLUMN_NAME from USER_TAB_COLS WHERE TABLE_NAME = '${tableName}'`;
		return conn.execute(query)
			.then(result => {
				const columns = result.rows.map(row => row[0]);
				return conn.execute(`SELECT ID FROM ${tableName}`).then(result => {
					const ids = result.rows.map(value => value[0]);
					const bindedRows = tableRows.reduce((prev, curr) => {
						let newRow = {};
						columns.forEach((col) => {
							newRow[col] = curr[col];
						});

						const pushTo = ids.includes(newRow.ID) ? 'toUpdate' : 'toInsert';
						prev[pushTo].push(newRow);
						return prev;
					}, {
						toInsert: [],
						toUpdate: []
					});

					const setString = columns.map(col => `${col} = :${col}`).join(', ');
					const condition = `${columns[0]} = :${columns[0]}`;

					const updateQuery = `UPDATE ${tableName} SET ${setString} WHERE ${condition}`;

					return conn.batchUpdate(updateQuery, bindedRows.toUpdate, {autoCommit: true}).then(() => {
						const joinedColumns = columns.map(col => `:${col}`).join(', ');
						const insertQuery = `INSERT INTO ${tableName} VALUES (${joinedColumns})`;
						return conn.batchInsert(insertQuery, bindedRows.toInsert, {autoCommit: true}).then(() => {
							return conn.execute(`SELECT * FROM ${tableName}`).then(result => {
								result.metaData = result.metaData.map(column => column.name);
								res.status(200).send(result);
								return conn.close();
							});
						}).catch(err => {
							console.log(err);
							res.status(500).json({message: err.message});
						});
					}).catch(err => {
						console.log(err);
						res.status(500).json({message: err.message});
					});
				});
			});
	})
		.catch(err => {res.status(500).json(err)});
}

function deleteTableRecords(res, tableName, ids) {
	return oracledb.getPool().getConnection().then(conn => {
		ids = ids.join(', ');
		const query = `DELETE FROM ${tableName} WHERE ID IN (${ids})`;
		return conn.execute(query, [], {autoCommit: true}).then(() => {
			return conn.execute(`SELECT * FROM ${tableName}`).then(result => {
				result.metaData = result.metaData.map(column => column.name);
				res.status(200).send(result);
				return conn.close();
			}).catch(err => {
				console.log(err);
				res.status(500).json({message: err.message});
			});
		}).catch(err => {
			console.log(err);
			res.status(500).json({message: err.message});
		});
	}).catch(err => res.status(500).send(err));
}