const ClothingItem = require('../models/clothingItem')

const createItem = (req, res) => {
  console.info(req);
  console.info(req.body);

  const {name, weather, imageUrl} = req.body;
  ClothingItem.create({name, weather, imageUrl}).then((item) => {
    console.info(item);
    res.status(200).send({data:item})
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

  ClothingItem.findByIdAndUpdate(itemId,
    {$set: {imageUrl: imageUrl}},
    {runValidators: true}
  ).orFail().then((item) => res.status(200).send({data: item}))
  .catch((err) => {
    res.status(500).send({message: `Error from updateItem: ${err}`});
  })
}

const deleteItem = (req, res) => {
  const {itemId} = req.params;
  console.info(`deleteItem: ${itemId}`)
  ClothingItem.findByIdAndDelete(itemId).orFail().then((item) => res.status(204).send({}))
  .catch((err) => {
    res.status(500).send({message: `Error from deleteItem: ${err}`});
  })
}

module.exports = {
  createItem,
  getItems,
  // updateItemImage,
  deleteItem
}