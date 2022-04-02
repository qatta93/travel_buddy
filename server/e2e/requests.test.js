const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');
const { getRequestById, createRequest, deleteRequestById } = require('../requests/helpers');

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
        expect(request.user).not.toBeUndefined();
        expect(request.user.id).not.toBeUndefined();
        expect(request.user.name).not.toBeUndefined();
        expect(request.user.username).not.toBeUndefined();
        expect(request.user.email).not.toBeUndefined();
        expect(request.status).toMatch(/^(pending|rejected|accepted|cancelled)$/);
        expect(request.sentOn).not.toBeUndefined();
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
      expect(data.user.id).toBe(1);
      expect(data.user.name).toBe('Patrycja');
      expect(data.user.username).toBe('qatta');
      expect(data.user.email).toBe('panasiuk.patrycja@gmail.com');
      expect(data.status).toMatch(/^(pending|rejected|accepted|cancelled)$/);
      expect(data.message).toBe('I would love to join you!');
      expect(data.sentOn).toMatch(/2022-04-02/);
    }));
});

describe('POST /api/requests', () => {
  const newRequest = {
    trip_id: 140,
    user_id: 2,
    message: 'test request',
  };

  let requestId;

  afterAll(async () => {
    await deleteRequestById(requestId);
  });

  test('should delete a new request', () => supertest(app)
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
      expect(request.user.id).toEqual(newRequest.user_id);
      expect(request.user.name).toEqual('Alejandro');
      expect(request.user.username).toEqual('aburto22');
      expect(request.user.email).toEqual('aburto22@gmail.com');
      expect(request.status).toEqual('pending');
      expect(request.message).toEqual(newRequest.message);
      expect(request.sentOn.toString()).toMatch((new Date()).toDateString());
    }));
});

describe('PUT /api/requests/:id', () => {
  const newRequest = {
    trip_id: 140,
    user_id: 2,
    message: 'test request',
  };

  let requestId;

  beforeAll(async () => {
    const { id } = await createRequest(newRequest);
    requestId = id;
  });

  afterAll(async () => {
    await deleteRequestById(requestId);
  });

  test('should update an existing request', () => supertest(app)
    .put(`/api/requests/${requestId}`)
    .set('Accept', 'application/json')
    .send({
      id: requestId,
      ...newRequest,
      status: 'accepted',
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(async (res) => {
      const { status, data } = res.body;
      expect(status).toBe('success');
      expect(data.id).toBe(requestId);
      expect(data.trip_id).toEqual(newRequest.trip_id);
      expect(data.user_id).toEqual(newRequest.user_id);
      expect(data.status).toEqual('accepted');
      expect(data.message).toEqual(newRequest.message);
    }));
});

describe('DELETE /api/users/:id', () => {
  const newRequest = {
    trip_id: 140,
    user_id: 2,
    message: 'test request',
  };

  let requestId;

  beforeAll(async () => {
    const { id } = await createRequest(newRequest);
    requestId = id;
  });

  test('should delete a request', () => supertest(app)
    .delete(`/api/requests/${requestId}`)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(async (res) => {
      const { status } = res.body;
      expect(status).toBe('success');
      const request = await getRequestById(requestId);
      expect(request).toBeNull();
    }));
});
