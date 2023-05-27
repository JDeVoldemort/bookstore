const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllStock = async (req, res, next) => {
  try {

  const result = await mongodb.getDb().db().collection('stock').find();
 
  result.toArray().then((lists) => {
    // if (err) {
    //   res.status(400).json({ message: err });
    // }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  

  }
  catch (err) {
    res.status(500).json(err);
  }
};

const getOneStock = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid stock id to find a stock.');
    }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('stock')
    .find({ _id: userId });
  result.toArray().then((err, lists) => {
    // if (err) {
    //   res.status(400).json({ message: err });
    // }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
}
catch (err) {
  res.status(500).json(err);
}
};
const createStock = async (req, res) => {
  try {

  const book = {
    name: req.body.name,
    pages: req.body.pages,
    author: req.body.author,
    publishDate: req.body.publishDate,
    aquireDate: req.body.aquireDate,
    publisher: req.body.publisher,
    edition: req.body.edition
  };
  const response = await mongodb.getDb().db().collection('stock').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the stock item.');
  }
}
  catch (err) {
    res.status(500).json(err);
  }
};
const updateStock = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid stock id to update a stock.');
  }

  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const book = {
    name: req.body.name,
    pages: req.body.pages,
    author: req.body.author,
    publishDate: req.body.publishDate,
    aquireDate: req.body.aquireDate,
    publisher: req.body.publisher,
    edition: req.body.edition
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('stock')
    .replaceOne({ _id: userId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the stock.');
  }
}
catch (err) {
  res.status(500).json(err);
}
};

const deleteStock = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid stock id to delete a stock.');
    }

  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('stock').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the book.');
  }
}
catch (err) {
  res.status(500).json(err);
}
};


module.exports = { getAllStock,
  getOneStock,
  createStock,
  updateStock,
  deleteStock
};