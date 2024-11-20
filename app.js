const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const mainRouter = require('./routers/main');

app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));
app.use(morgan('dev'));
app.use(cors());
app.use(mainRouter);

module.exports = app;