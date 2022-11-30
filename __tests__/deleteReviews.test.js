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
    const setupPool = setup(pool);
    //log in test user and create a review
    const [agent] = await registerAndLogin();
    await agent
      .post('/api/v1/restaurants/2/reviews')
      .send({ stars: 3, detail: 'junk review to be deleted' });
    return setupPool;
  });

  it('DELETE /api/v1/reviews/:id fails if user not logged in', async () => {
    const response = await request(app).delete('/api/v1/reviews/4');
    expect(response.status).toBe(401);
  });

  it('DELETE /api/v1/reviews/:id fails if user did not create review', async () => {
    const [agent2] = await registerAndLogin(testUser2);
    const response = await agent2.delete('/api/v1/reviews/4');
    expect(response.status).toBe(401);
  });

  it('DELETE /api/v1/reviews/:id succeeds if user created the review', async () => {
    const [agent] = await registerAndLogin();
    const response = await agent.delete('/api/v1/reviews/4');
    expect(response.status).toBe(204);
  });

  it('DELETE /api/v1/reviews/:id succeeds if user created the review', async () => {
    const [agentAdmin] = await registerAndLogin(testAdmin);
    const response = await agentAdmin.delete('/api/v1/reviews/4');
    expect(response.status).toBe(204);
  });

  afterAll(() => {
    pool.end();
  });
});
