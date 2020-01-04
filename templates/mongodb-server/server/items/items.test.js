import MongodbMemoryServer from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Item from './item.model';

describe('/api/items tests', () => {
  const mongod = new MongodbMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await Item.remove({});
  });

  it('should post and get items', async () => {
    const postResponse = await request(app)
      .post('/api/items')
      .send({ name: 'new item', value: 2000 });
    expect(postResponse.status).toBe(200);
    expect(postResponse.body).toBe('Item saved!');

    const getResponse = await request(app).get('/api/items');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([expect.objectContaining({ name: 'new item', value: 2000 })]);
  });
});
