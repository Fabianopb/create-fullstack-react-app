const db = require('../models');

const itemsController = {
  findAll: async (_, response) => {
    const items = await db.Item.findAll();
    return response.status(200).json(items);
  },
  create: async (req, res) => {
    try {
      await db.Item.create(req.body);
      return res.status(200).json({ message: 'Item created successfully' });
    } catch (error) {
      return res.status(res.statusCode).json(error);
    }
  },
};

module.exports = itemsController;
