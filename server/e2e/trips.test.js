const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');
const { deleteTripById, getTripById } = require('../trips/helpers');

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

describe('POST /api/trips', () => {
  const newTrip = {
    authorId: 2,
    summary: 'a great test trip',
    budget: 5000,
    description: 'just read this',
    maxPassengers: 5,
    countries: ['Estonia', 'Poland'],
    activities: ['Hiking', 'Mountains'],
    places: ['Forests', 'Windowm lake'],
  };

  let tripId;

  afterAll(async () => {
    await deleteTripById(tripId);
  });

  test('should create a new trip', () => supertest(app)
    .post('/api/trips')
    .set('Accept', 'application/json')
    .send(newTrip)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect('Location', /^\/api\/trips\/\d+$/)
    .expect(async (res) => {
      const { status, data } = res.body;
      expect(status).toBe('success');
      expect(data.id).not.toBeUndefined();

      tripId = data.id;

      const trip = await getTripById(tripId);

      expect(trip.id).toBe(tripId);
      expect(trip.authorId).toBe(newTrip.authorId);
      expect(trip.summary).toBe(newTrip.summary);
      expect(trip.description).toBe(newTrip.description);
      expect(trip.budget).toBe(newTrip.budget);
      expect(trip.maxPassengers).toBe(newTrip.maxPassengers);
      expect(trip.countries).toEqual(expect.arrayContaining(newTrip.countries));
      expect(trip.activities).toEqual(expect.arrayContaining(newTrip.activities));
      expect(trip.places).toEqual(expect.arrayContaining(newTrip.places));
      expect(trip.passengers).toEqual([]);
    }));
});
