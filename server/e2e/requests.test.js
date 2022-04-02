const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');

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
