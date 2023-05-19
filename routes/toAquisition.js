const express = require('express');
const routes = express.Router();

const toAquisitionController = require('../controllers/toAquisition');

routes.get('/', toAquisitionController.getAllAquisition);

routes.get('/:id', toAquisitionController.getOneAquisition);

routes.post('/', toAquisitionController.createAquisition);

routes.put('/:id', toAquisitionController.updateAquisition);

routes.delete('/:id', toAquisitionController.deleteAquisition);
module.exports = routes;