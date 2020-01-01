const bodyParser = require('body-parser');
const express = require('express');
const Item = require('./item.model');

const router = express.Router();

router.route('/').get(async (_, response) => {
  const items = await Item.find();
  return response.status(200).json(items);
});

router.route('/').post(bodyParser.json(), async (request, response) => {
  try {
    const item = new Item(request.body);
    await item.save();
    return response.status(200).json('Item saved!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

module.exports = router;
