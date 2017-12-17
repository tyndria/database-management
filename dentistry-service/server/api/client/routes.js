const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.route('/')
	.get((req, res) => {
		return controller.getClients(res);
	});

router.route('/clients')
	.get((req, res) => {
		return controller.getClients(res);
	});

router.route('/clientsByDay')
	.get((req, res) => {
		return controller.getClientsByDay(res);
	});

module.exports = router;