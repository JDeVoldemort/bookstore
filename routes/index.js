const routes = require('express').Router();
const names = require('../controllers');

routes.use('/', require('./swagger'));

routes.get('/', names.displayName); //localhost:8080
routes.use('/stock', require('./stock'))
routes.use('/toAquisition', require('./toAquisition'))

module.exports = routes;