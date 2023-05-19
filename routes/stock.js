const express = require('express');
const routes = express.Router();

const stockController = require('../controllers/stock');

routes.get('/', stockController.getAllStock);

routes.get('/:id', stockController.getOneStock);

routes.post('/', stockController.createStock);

routes.put('/:id', stockController.updateStock);

routes.delete('/:id', stockController.deleteStock);
module.exports = routes;