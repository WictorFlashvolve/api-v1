const express = require('express');
const Services = require('./services');
const app = express.Router();
app.post('/formatphone', Services.dataSave);
app.get('/', Services.index);
module.exports = app;
