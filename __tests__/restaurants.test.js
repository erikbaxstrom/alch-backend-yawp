const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('restaurant routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/vi/restaurants should return a list of restaurants', async () => {
    // GET /api/v1/restaurants
    const response = await request(app).get('/api/v1/restaurants');
    expect(response.status).toBe(200);
    expect(response.body[3]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it('GET /api/v1/restaurants/:restId shows restaurant detail including a list of reviews', async () => {
    const response = await request(app).get('/api/v1/restaurants/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      cuisine: expect.any(String),
      cost: expect.any(String),
      image: expect.any(String),
      website: expect.any(String),
      reviews: {
        stars: expect.any(Number),
        detail: expect.any(String),
      },
    });
  });

  afterAll(() => {
    pool.end();
  });
});
