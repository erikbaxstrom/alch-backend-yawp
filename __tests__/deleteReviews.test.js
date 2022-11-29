const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// Test users
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: '12345',
};

const testUser2 = {
  email: 'test2@test.com',
};

const testAdmin = {
  email: 'admin',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser.password;

  // Create agent
  const agent = request.agent(app);
  // Create user
  const user = await UserService.create({ ...testUser, ...userProps });
  // Sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('review routes', () => {
  beforeEach(() => {
    //log in test user and create a review
    return setup(pool);
  });

  //test: not logged in
  // do not log in. just try to delete. should 404
  it('DELETE /api/v1/reviews/:id fails if user not logged in', async () => {
    const response = await request(app).delete('/api/v1/reviews/:id');
    expect(response.status).toBe(404);
  });

  // test: logged in but wrong user
  // log in as user2, try to delete. should 401

  // test: logged in and correct user
  // log in as user1, try to delte. should 204

  // test: logged in as admin
  // log in as admin, try to delete. should 204

  afterAll(() => {
    pool.end();
  });
});
