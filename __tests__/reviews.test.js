const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// Test user
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: '12345',
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
    return setup(pool);
  });

  it('POST /api/v1/restaurants/:restId/reviews fails if user not logged in', async () => {
    const response = await request(app)
      .post('/api/v1/restaurants/2/reviews')
      .send({ stars: 5, detail: 'this should fail' });
    expect(response.status).toBe(401);
  });

  it('POST /api/v1/restaurants/:restId/reviews from logged in user creates a new review', async () => {
    const [agent] = await registerAndLogin();
    const response = await agent
      .post('/api/v1/restaurants/2/reviews')
      .send({ stars: 5, detail: 'It was okay' });
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot();
  });

  afterAll(() => {
    pool.end();
  });
});
