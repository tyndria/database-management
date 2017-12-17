const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const oracledb = require('oracledb');

const dbConfig = require('./db/db.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('dev'));
app.use(cookieParser());

const patientRouter = require('./api/patient/routes');
const doctorRouter = require('./api/doctor/routes');
const serviceRouter = require('./api/service/routes');
const visitRouter = require('./api/visit/routes');
const revenueRouter = require('./api/revenue/routes');
const patientDetails = require('./api/patientDetails/routes');

app.use('/api/patient', patientRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/service', serviceRouter);
app.use('/api/visit', visitRouter);
app.use('/api/revenue', revenueRouter);
app.use('/api/patientDetails', patientDetails);

const port = 8000;

oracledb.createPool(dbConfig).then( () => {
	app.listen(port, () => {
		console.log(`Express server listening on port ${port}`);
	});
});