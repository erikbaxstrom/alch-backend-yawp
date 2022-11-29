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
  beforeEach(async () => {
    //log in test user and create a review
    const [agent] = await registerAndLogin();
    //todo create review
    await agent
      .post('/api/v1/restaurants/2/reviews')
      .send({ stars: 3, detail: 'junk review to be deleted' });
    return setup(pool);
  });

  //test: not logged in
  it('DELETE /api/v1/reviews/:id fails if user not logged in', async () => {
    // do not log in. just try to delete. should 401
    const response = await request(app).delete('/api/v1/reviews/4');
    expect(response.status).toBe(401);
  });

  // test: logged in but wrong user
  it('DELETE /api/v1/reviews/:id fails if user did not create review', async () => {
    // log in as user2, try to delete. should 401
    const [agent2] = await registerAndLogin(testUser2);
    const response = await agent2.delete('/api/v1/reviews/4');
    expect(response.status).toBe(401);
  });

  // test: logged in and correct user
  it('DELETE /api/v1/reviews/:id succeeds if user created the review', async () => {
    // log in as test user, try to delete. should 204
    const [agent] = await registerAndLogin();
    const response = await agent.delete('/api/v1/reviews/4');
    expect(response.status).toBe(204);
  });

  // test: logged in as admin
  it('DELETE /api/v1/reviews/:id succeeds if user created the review', async () => {
    // log in as admin, try to delete. should 204
    const [agentAdmin] = await registerAndLogin(testAdmin);
    const response = await agentAdmin.delete('/api/v1/reviews/4');
    expect(response.status).toBe(204);
  });

  afterAll(() => {
    pool.end();
  });
});
