import bodyParser from 'body-parser';
import { Router } from 'express';
import User from './user.model';

const router = Router();

router.route('/').post(bodyParser.json(), async (request, response) => {
  try {
    const user = new User(request.body);
    await user.save();
    return response.status(200).json('User created!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route('/').get(async (_, response) => {
  const users = await User.find();
  return response.status(200).json(users);
});

export default router;
