const validator = require('../helpers/validate');

const saveStock = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    pages: 'required|int',
    author: 'required|string',
    publishDate: 'required|string',
    aquireDate: 'required|string',
    publisher: 'required|string',
    edition: 'required|string'

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Stock Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const saveAquisition = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    author: 'required|string',
    publishDate: 'required|date',
    publisher: 'required|string',
    edition: 'required|string'

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Aquisition Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveStock,
  saveAquisition
};
