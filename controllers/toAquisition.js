const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllAquisition = async (req, res, next) => {
  try {

    const result = await mongodb.getDb().db().collection('toAquisition').find();
  result.toArray().then(( lists) => {
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

const getOneAquisition = async (req, res, next) => {
  try {

  const userId = new ObjectId(req.params.id);
  if (!userId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Aquisition id to find a Aquisition.');
  }
  const result = await mongodb
    .getDb()
    .db()
    .collection('toAquisition')
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
const createAquisition = async (req, res) => {
  try {


  const book = {
    name: req.body.name,
    author: req.body.author,
    publishDate: req.body.publishDate,
    publisher: req.body.publisher,
    edition: req.body.edition
  };
  const response = await mongodb.getDb().db().collection('toAquisition').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the Aquisition item.');
  }
}
  catch (err) {
    res.status(500).json(err);
  }
};
const updateAquisition = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid Aquisition id to update a Aquisition.');
    }

  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
 
  const book = {
    name: req.body.name,
    author: req.body.author,
    publishDate: req.body.publishDate,
    publisher: req.body.publisher,
    edition: req.body.edition
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('toAquisition')
    .replaceOne({ _id: userId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the Aquisition.');
  }
  // if (!userId.isValid(req.params.id)) {
  //   res.status(400).json('Must use a valid Aquisition id to update a Aquisition.');
  // }
  // if (res.status(400).json(response.error || 'Invalid entry check datatypes')
}
catch (err) {
  res.status(500).json(err);
}
};

const deleteAquisition = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid Aquisition id to delete a Aquisition.');
    }

  const userId = new ObjectId(req.params.id);

  const response = await mongodb.getDb().db().collection('toAquisition').deleteOne({ _id: userId }, true);
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


module.exports = { getAllAquisition,
  getOneAquisition,
  createAquisition,
  updateAquisition,
  deleteAquisition
};