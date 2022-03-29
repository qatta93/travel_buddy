const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');

afterAll(() => sql.end());

describe('GET /api/trips', () => {
  test('should return a list of trips', () => supertest(app)
    .get('/api/trips')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');
      expect(Array.isArray(data)).toBe(true);

      data.forEach((trip) => {
        expect(trip.id).not.toBeUndefined();
        expect(trip.authorId).not.toBeUndefined();
        expect(trip.authorUsername).not.toBeUndefined();
        expect(trip.description).not.toBeUndefined();
        expect(trip.maxPassengers).not.toBeUndefined();
        expect(Array.isArray(trip.countries)).toBe(true);
        expect(trip.countries.length > 0).toBe(true);
        expect(Array.isArray(trip.activities)).toBe(true);
        expect(trip.activities.length > 0).toBe(true);
        expect(Array.isArray(trip.places)).toBe(true);
        expect(trip.places.length > 0).toBe(true);
        expect(Array.isArray(trip.passengers)).toBe(true);
        expect(trip.passengers.length >= 0).toBe(true);
      });
    }));
});

describe('GET /api/trips/:id', () => {
  test('should return a single trip', () => supertest(app)
    .get('/api/trips/1')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      const { status, data } = res.body;

      expect(status).toBe('success');

      expect(data.id).toBe(1);
      expect(data.authorId).toBe(1);
      expect(data.authorUsername).toBe('qatta');
      expect(data.description).toBe('dream trip');
      expect(data.maxPassengers).toBe(5);
      expect(data.countries).toEqual(expect.arrayContaining(['Chile', 'Canada']));
      expect(data.activities).toEqual(expect.arrayContaining(['beach']));
      expect(data.places).toEqual(expect.arrayContaining(['The Rockies']));
      expect(data.passengers).toEqual(expect.arrayContaining([1, 2]));
    }));
});
