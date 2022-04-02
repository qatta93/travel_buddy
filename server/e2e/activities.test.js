const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');

afterAll(async () => {
  sql.end();
});

describe('GET /api/activities', () => {
  test('should return a list of activities', () => supertest(app)
    .get('/api/activities')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');
      expect(Array.isArray(data)).toBe(true);

      data.forEach((activity) => {
        expect(activity.id).not.toBeUndefined();
        expect(activity.activity).not.toBeUndefined();
      });
    }));
});

describe('GET /api/activities/:id', () => {
  test('should return a a single activity', () => supertest(app)
    .get('/api/activities/2')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');

      expect(data.id).toBe(2);
      expect(data.activity).toBe('Hiking');
    }));
});
