const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');
const {
  getLanguagesByUserId, deleteUserById, createUser, getUserById,
} = require('../users/helpers');

afterAll(async () => {
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
        expect(user.id).not.toBeUndefined();
        expect(user.username).not.toBeUndefined();
        expect(user.email).not.toBeUndefined();
        expect(user.name).not.toBeUndefined();
        expect(user.age).not.toBeUndefined();
        expect(user.gender).not.toBeUndefined();
        expect(user.country).not.toBeUndefined();
        expect(Array.isArray(user.languages)).toBe(true);

        user.languages.forEach((language) => {
          expect(language.id).not.toBeUndefined();
          expect(language.language).not.toBeUndefined();
          expect(language.languageCode).not.toBeUndefined();
        });
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

      expect(data.id).toBe(1);
      expect(data.username).toBe('qatta');
      expect(data.email).toBe('panasiuk.patrycja@gmail.com');
      expect(data.name).toBe('Patrycja');
      expect(data.gender).toBe('female');
      expect(data.country).toBe('Poland');
      expect(data.age).toBe(28);
      expect(data.avatar).toBe('https://avatars.githubusercontent.com/u/57223600?v=4');

      data.languages.forEach((language) => {
        expect([1, 27, 87]).toContain(language.id);
        expect(['English', 'Spanish', 'Polish']).toContain(language.language);
        expect(['EN', 'ES', 'PL']).toContain(language.languageCode);
      });
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
    avatar: 'link 1',
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

      languages.forEach((language) => {
        expect([1, 28]).toContain(language.id);
        expect(['English', 'Estonian']).toContain(language.language);
        expect(['EN', 'ET']).toContain(language.languageCode);
      });
    }));
});

describe('DELETE /api/users/:id', () => {
  const newUser = {
    name: 'test user 1',
    username: 'test_username',
    email: 'test@username.com',
    age: 20,
    country: 'Chile',
    gender: 'female',
    languages: ['English'],
  };

  let userId;

  beforeAll(async () => {
    const { id } = await createUser(newUser);
    userId = id;
  });

  test('should delete an user', () => supertest(app)
    .delete(`/api/users/${userId}`)
    .expect(200)
    .expect(async (res) => {
      const { status } = res.body;
      expect(status).toBe('success');
      const user = await getUserById(userId);
      expect(user).toBeNull();
    }));
});

describe('PUT /api/users/:id', () => {
  const newUser = {
    name: 'test user 1',
    username: 'test_username',
    email: 'test@username.com',
    age: 20,
    country: 'Chile',
    gender: 'female',
    languages: ['English'],
  };

  const updatedUser = {
    name: 'test user 2',
    username: 'test_username_2',
    email: 'test2@username.com',
    age: 25,
    country: 'Spain',
    gender: 'male',
    languages: ['English', 'Spanish'],
  };

  let userId;

  beforeAll(async () => {
    const { id } = await createUser(newUser);
    userId = id;
  });

  afterAll(async () => {
    await deleteUserById(userId);
  });

  test('should update an user', () => supertest(app)
    .put(`/api/users/${userId}`)
    .set('Accept', 'application/json')
    .send(updatedUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(async (res) => {
      const { status, data } = res.body;
      expect(status).toBe('success');

      expect(data.id).toBe(userId);

      const user = await getUserById(userId);

      expect(user.id).toBe(userId);
      expect(user.username).toBe(user.username);
      expect(user.email).toBe(user.email);
      expect(user.name).toBe(user.name);
      expect(user.gender).toBe(user.gender);
      expect(user.country).toBe(user.country);
      expect(user.age).toBe(user.age);

      user.languages.forEach((language) => {
        expect([1, 27]).toContain(language.id);
        expect(['English', 'Spanish']).toContain(language.language);
        expect(['EN', 'ES']).toContain(language.languageCode);
      });
    }));
});
