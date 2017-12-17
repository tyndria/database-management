const express = require('express');

const router = express.Router();
const utils = require('../utils');

const TABLE_NAME = 'SERVICE';

router.route('/')
	.get((req, res) => {
		return utils.getTableRecords(res, TABLE_NAME);
	})
	.delete((req, res) => {
		const {rowsToDelete} = req.query;
		return utils.deleteTableRecords(res, TABLE_NAME, rowsToDelete);
	})
	.put((req, res) => {
		const {rowsToUpdate} = req.body;
		return utils.updateTableRecords(res, TABLE_NAME, rowsToUpdate);
	});


module.exports = router;