const ClothingItem = require('../models/clothingItem')

const createItem = (req, res) => {
  console.info(req);
  console.info(req.body);

  const {name, weather, imageUrl} = req.body;
  ClothingItem.create({name, weather, imageUrl}).then((item) => {
    console.info(item);
    res.send({data:item})
  }).catch((err) => {
    res.status(500).send({message: `Error from createItem: ${err}`});
  })
}

const getItems = (req, res) => {
  ClothingItem.find({}).then((items) => res.status(200).send(items))
  .catch((err) => {
      res.status(500).send({message: `Error from getItems: ${err}`});
    })
}

const updateItem = (req, res) => {
  const {itemId} = req.params;
  const {imageUrl} = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {$set: {imageUrl}}).orFail().then((item) => res.status(200).send({data: item}))
  .catch((err) => {
    res.status(500).send({message: `Error from updateItem: ${err}`});
  })
}

module.exports = {
  createItem,
  getItems,
  updateItem
}