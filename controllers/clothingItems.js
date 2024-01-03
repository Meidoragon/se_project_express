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

module.exports = {
  createItem
}