import express from 'express';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import usersController from './db/controllers/users';
import itemsController from './db/controllers/items';

const app = express();

const usersRouter = express.Router();
usersRouter.get('/', usersController.findAll);
usersRouter.post('/', bodyParser.json(), usersController.create);
app.use('/api/users', usersRouter);

const itemsRouter = express.Router();
itemsRouter.get('/', itemsController.findAll);
itemsRouter.post('/', bodyParser.json(), itemsController.create);
app.use('/api/items', itemsRouter);

app.get('/api', (_, res) => {
  res.send('Hello, world!');
});

app.use(express.static(resolve('..', 'build')));

app.all('*', (_, response) => {
  response.sendFile(resolve('..', 'build', 'index.html'));
});

export default app;
