const express = require('express');

const controller = require('./controller');
const router = express.Router();

router.route('/')
	.get((req, res) => {
		return controller.getPatientDetails(res);
	});

module.exports = router;