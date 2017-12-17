const express = require('express');

const controller = require('./controller');
const utils = require('../utils');
const TABLE_NAME = 'VISIT';
const router = express.Router();

router.route('/')
	.get((req, res) => {
		return controller.getVisits(res);
	})
	.delete((req, res) => {
		const {rowsToDelete} = req.query;
		return utils.deleteTableRecords(res, TABLE_NAME, rowsToDelete);
	})
	.put((req, res) => {
		const {rowsToUpdate} = req.body;
		return utils.deleteTableRecords(res, TABLE_NAME, rowsToUpdate);
	});

module.exports = router;