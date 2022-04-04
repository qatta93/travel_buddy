const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');

afterAll(async () => {
  sql.end();
});

describe('GET /api/languages', () => {
  test('should return a list of languages', () => supertest(app)
    .get('/api/languages')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');
      expect(Array.isArray(data)).toBe(true);

      data.forEach((language) => {
        expect(language.id).not.toBeUndefined();
        expect(language.language).not.toBeUndefined();
        expect(language.languageCode).not.toBeUndefined();
      });
    }));
});

describe('GET /api/languages/:id', () => {
  test('should return a a single language', () => supertest(app)
    .get('/api/languages/70')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');

      expect(data.id).toBe(70);
      expect(data.language).toBe('Malagasy');
      expect(data.languageCode).toBe('MG');
    }));
});
