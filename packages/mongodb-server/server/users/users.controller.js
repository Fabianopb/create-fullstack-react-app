const bodyParser = require('body-parser');
const express = require('express');
const User = require('./user.model');

const router = express.Router();

router.route('/').post(bodyParser.json(), async (request, response) => {
  try {
    const user = new User(request.body);
    await user.save();
    return response.status(200).json('User created!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route('/').get(async (request, response) => {
  const user = await User.findById(request.user._id);
  return response.status(200).json(user);
});

module.exports = router;
