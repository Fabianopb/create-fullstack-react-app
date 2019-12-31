const mongoose = require('mongoose');

const itemSchemaDef = {
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
};

const itemSchema = new mongoose.Schema(itemSchemaDef);

module.exports = mongoose.model('Item', itemSchema);
