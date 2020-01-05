import request from 'supertest';
import app from '../app';
import db from '../models';

afterAll(() => {
  db.sequelize.close();
});

describe('Users endpoints tests', () => {
  it('creates and gets a user', async done => {
    // create a user
    await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', age: 30 });
    // get the created user
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('John Doe');
    expect(response.body[0].age).toBe(30);
    done();
  });
});
