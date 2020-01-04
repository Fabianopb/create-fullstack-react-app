import { Schema, model } from 'mongoose';

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

const itemSchema = new Schema(itemSchemaDef);

export default model('Item', itemSchema);
