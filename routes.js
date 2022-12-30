const express = require('express');
const Services = require('./services');
const app = express.Router();
app.get('/', Services.index);
app.post('/format-phone', Services.dataSave);
module.exports = app;
