const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.route('/')
	.get((req, res) => {
		return controller.getPatients(res);
	});

router.route('/patients')
	.get((req, res) => {
		return controller.getPatients(res);
	});

router.route('/patientsByDay')
	.get((req, res) => {
		return controller.getPatientsByDay(res);
	});

module.exports = router;