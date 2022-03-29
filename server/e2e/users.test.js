const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');
const {
  getLanguagesByUserId, deleteUserById, createUser, deleteAllTestUsers, getUserById,
} = require('../users/db');

afterAll(async () => {
  await deleteAllTestUsers();
  sql.end();
});

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
        expect(user.age).not.toBeUndefined();
        expect(user.gender).not.toBeUndefined();
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
      expect(data.gender).toBe('male');
      expect(data.country).toBe('Poland');
      expect(data.age).toBe(18);
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

describe('POST /api/users', () => {
  const newUser = {
    name: 'test user 1',
    username: 'test_username',
    email: 'test@username.com',
    age: 20,
    summary: 'im the best',
    country: 'Estonia',
    languages: ['Estonian', 'English'],
    gender: 'female',
  };

  let userId;

  afterAll(async () => {
    await deleteUserById(userId);
  });

  test('should create a new user', () => supertest(app)
    .post('/api/users')
    .set('Accept', 'application/json')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect('Location', /^\/api\/users\/\d+$/)
    .expect(async (res) => {
      const { status, data } = res.body;
      expect(status).toBe('success');
      expect(data.username).toBe('test_username');
      expect(data.id).not.toBeUndefined();

      userId = data.id;

      const languages = await getLanguagesByUserId(data.id);
      expect(languages).toEqual(expect.arrayContaining(['Estonian', 'English']));
    }));
});

describe('DELETE /api/users/:id', () => {
  const u = {
    name: 'test user 1',
    username: 'test_username',
    email: 'test@username.com',
    age: 20,
    countryId: 55,
    gender: 'female',
  };

  let userId;

  beforeAll(async () => {
    const { id } = await createUser(u.email, u.username, u.name, u.gender, u.age, u.countryId);
    userId = id;
  });

  test('should create a new user', () => supertest(app)
    .delete(`/api/users/${userId}`)
    .expect(204)
    .expect(async () => {
      const user = await getUserById(userId);
      expect(user).toHaveLength(0);
    }));
});
