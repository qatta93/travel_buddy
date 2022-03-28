const supertest = require('supertest');
const app = require('../app');

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
