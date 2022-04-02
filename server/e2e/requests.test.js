const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');
const { getRequestById } = require('../requests/helpers');

afterAll(async () => {
  sql.end();
});

describe('GET /api/requests', () => {
  test('should return a list of requests', () => supertest(app)
    .get('/api/requests')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');
      expect(Array.isArray(data)).toBe(true);

      data.forEach((request) => {
        expect(request.id).not.toBeUndefined();
        expect(request.trip_id).not.toBeUndefined();
        expect(request.user_id).not.toBeUndefined();
        expect(request.status).toMatch(/^(pending|rejected|accepted|cancelled)$/);
      });
    }));
});

describe('GET /api/requests/:id', () => {
  test('should return a a single requests', () => supertest(app)
    .get('/api/requests/2')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');

      expect(data.id).toBe(2);
      expect(data.trip_id).toBe(138);
      expect(data.user_id).toBe(1);
      expect(data.status).toMatch(/^(pending|rejected|accepted|cancelled)$/);
      expect(data.message).toBe('I would love to join you!');
    }));
});

describe('POST /api/users', () => {
  const newRequest = {
    trip_id: 140,
    user_id: 2,
    message: 'test request',
  };

  let requestId;

  // afterAll(async () => {
  //   await deleteUserById(userId);
  // });

  test('should create a new request', () => supertest(app)
    .post('/api/requests')
    .set('Accept', 'application/json')
    .send(newRequest)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect('Location', /^\/api\/requests\/\d+$/)
    .expect(async (res) => {
      const { status, data } = res.body;
      expect(status).toBe('success');
      expect(data.id).not.toBeUndefined();

      requestId = data.id;

      const request = await getRequestById(requestId);
      expect(request.trip_id).toEqual(newRequest.trip_id);
      expect(request.user_id).toEqual(newRequest.user_id);
      expect(request.status).toEqual('pending');
      expect(request.message).toEqual(newRequest.message);
    }));
});
