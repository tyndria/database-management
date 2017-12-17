const express = require('express');

const controller = require('./controller');
const TABLE_NAME = 'PATIENT';
const router = express.Router();

router.route('/')
	.get((req, res) => {
		return controller.getPatients(res);
	})
	.delete((req, res) => {
		const {rowsToDelete} = req.query;
		return controller.deletePatientsById(res, TABLE_NAME, rowsToDelete);
	})
	.put((req, res) => {
		const {rowsToUpdate} = req.body;
		return controller.updatePatientsById(res, TABLE_NAME, rowsToUpdate);
	});

module.exports = router;