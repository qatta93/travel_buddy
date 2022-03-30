const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');

afterAll(async () => {
  sql.end();
});

describe('GET /api/countries', () => {
  test('should return a list of countries', () => supertest(app)
    .get('/api/countries')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');
      expect(Array.isArray(data)).toBe(true);

      data.forEach((country) => {
        expect(country.id).not.toBeUndefined();
        expect(country.country).not.toBeUndefined();
      });
    }));
});

describe('GET /api/countries/:id', () => {
  test('should return a a single country', () => supertest(app)
    .get('/api/countries/50')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');

      expect(data.id).toBe(50);
      expect(data.country).toBe('Colombia');
    }));
});
