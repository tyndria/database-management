const oracledb = require('oracledb');
oracledb.stmtCacheSize = 0;

const SimpleOracleDb = require('simple-oracledb');
SimpleOracleDb.extend(oracledb);

const utils = require('../utils');

function getPatients(res) {
	return utils.getTableRecords(res, 'PATIENT');
}

function getPatientsByDay(res) {

}

module.exports = {
	getPatients,
	getPatientsByDay
};
