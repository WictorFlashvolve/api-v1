const express = require('express');
const Services = require('./services');
const app = express.Router();
app.get('/', Services.index);
app.get('/valid-data', Services.dataSave);
module.exports = app;
