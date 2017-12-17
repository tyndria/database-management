const express = require('express');

const controller = require('./controller');
const router = express.Router();

router.route('/')
	.get((req, res) => {
		const {date} = req.query;
		return controller.getVisitPatients(res, date);
	});

module.exports = router;