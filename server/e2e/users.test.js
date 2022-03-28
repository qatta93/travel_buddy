const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');

afterAll(() => sql.end());

describe('GET /api/users', () => {
  test('should return a list of users', () => supertest(app)
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');
      expect(Array.isArray(data)).toBe(true);

      data.forEach((user) => {
        expect(user.username).not.toBeUndefined();
        expect(user.email).not.toBeUndefined();
        expect(user.name).not.toBeUndefined();
        expect(user.country).not.toBeUndefined();
        expect(Array.isArray(user.languages)).toBe(true);
        expect(user.languages.length > 0).toBe(true);
      });
    }));
});

describe('GET /api/users/:id', () => {
  test('should return a single user', () => supertest(app)
    .get('/api/users/1')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;
      expect(status).toBe('success');
      expect(data.username).toBe('qatta');
      expect(data.email).toBe('panasiuk.patrycja@gmail.com');
      expect(data.name).toBe('Patrycja');
      expect(data.country).toBe('Poland');
      expect(Array.isArray(data.languages)).toBe(true);
      expect(data.languages.length > 0).toBe(true);
      expect(data.languages).toContain('English');
      expect(data.languages).toContain('Polish');
    }));

  test('should return error message for wrong id', () => supertest(app)
    .get('/api/users/abc')
    .expect(404)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, message } = res.body;
      expect(status).toBe('error');
      expect(message).toBe('user not found');
    }));
});
