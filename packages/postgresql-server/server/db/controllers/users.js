const db = require('../models');

const usersController = {
  findAll: async (_, res) => {
    try {
      const users = await db.User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(res.statusCode).json(error);
    }
  },
  create: async (req, res) => {
    try {
      await db.User.create(req.body);
      return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(res.statusCode).json(error);
    }
  },
};

module.exports = usersController;
