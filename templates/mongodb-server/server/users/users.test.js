const MongodbMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('./user.model');

describe('/api/users tests', () => {
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
    await User.remove({});
  });

  it('should post and get a user', async () => {
    const postResponse = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', age: 34 });
    expect(postResponse.status).toBe(200);

    const getResponse = await request(app).get('/api/users');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([expect.objectContaining({ name: 'John Doe', age: 34 })]);
  });
});
