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

const clientRouter = require('./api/client/routes');

app.use('/api/client', clientRouter);

const port = 8000;

oracledb.createPool(dbConfig).then( () => {
	app.listen(port, () => {
		console.log(`Express server listening on port ${port}`);
	});
});