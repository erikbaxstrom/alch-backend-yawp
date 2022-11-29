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
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "cost": 1,
        "cuisine": "American",
        "id": "1",
        "image": "https://media-cdn.tripadvisor.com/media/photo-o/05/dd/53/67/an-assortment-of-donuts.jpg",
        "name": "Pip's Original",
        "reviews": Array [
          Object {
            "detail": "Best restaurant ever!",
            "id": 1,
            "restaurant_id": 1,
            "stars": 5,
            "user_id": 1,
          },
          Object {
            "detail": "Terrible service :(",
            "id": 2,
            "restaurant_id": 1,
            "stars": 1,
            "user_id": 2,
          },
          Object {
            "detail": "It was fine.",
            "id": 3,
            "restaurant_id": 1,
            "stars": 4,
            "user_id": 3,
          },
        ],
        "website": "http://www.PipsOriginal.com",
      }
    `);
    // expect(response.body).toEqual({
    //   id: expect.any(String),
    //   name: expect.any(String),
    //   cuisine: expect.any(String),
    //   cost: expect.any(Number),
    //   image: expect.any(String),
    //   website: expect.any(String),
    //   reviews: {
    //     stars: expect.any(Number),
    //     detail: expect.any(String),
    //   },
    // });
  });

  afterAll(() => {
    pool.end();
  });
});
