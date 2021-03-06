const supertest = require('supertest');
const app = require('../app');
const sql = require('../db');
const { deleteTripById, getTripById, createTrip } = require('../trips/helpers');

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
        expect(trip.author).not.toBeUndefined();
        expect(trip.author.id).not.toBeUndefined();
        expect(trip.author.username).not.toBeUndefined();
        expect(trip.author.gender).not.toBeUndefined();
        expect(trip.author.age).not.toBeUndefined();
        expect(trip.description).not.toBeUndefined();
        expect(trip.from).not.toBeUndefined();
        expect(trip.to).not.toBeUndefined();
        expect(trip.maxPassengers).not.toBeUndefined();
        expect(Array.isArray(trip.activities)).toBe(true);
        expect(trip.activities.length > 0).toBe(true);
        expect(Array.isArray(trip.places)).toBe(true);
        expect(trip.places.length > 0).toBe(true);
        expect(Array.isArray(trip.requests)).toBe(true);
        expect(trip.requests.length >= 0).toBe(true);
        expect(Array.isArray(trip.countries)).toBe(true);

        trip.countries.forEach((country) => {
          expect(country.id).not.toBeUndefined();
          expect(country.country).not.toBeUndefined();
          expect(country.code).not.toBeUndefined();
          expect(country.countryCode).not.toBeUndefined();
        });
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
      expect(data.author.id).toBe(1);
      expect(data.author.username).toBe('qatta');
      expect(data.author.gender).toBe('female');
      expect(data.author.age).toBe(28);
      expect(data.description).not.toBeUndefined();
      expect(data.from).toEqual((new Date('2022-03-30').toISOString()));
      expect(data.to).toEqual((new Date('2022-03-30').toISOString()));
      expect(data.maxPassengers).toBe(5);
      expect(data.video).toBe('F1AYXQBSnUc');
      expect(data.activities).toEqual(expect.arrayContaining(['Beach']));
      expect(data.places).toEqual(expect.arrayContaining(['The Rockies']));
      expect(data.genderRestrictions).toBeNull();

      data.requests.forEach((request) => {
        expect([2, 3]).toContain(request.userId);
        expect(['accepted', 'rejected']).toContain(request.status);
      });

      data.countries.forEach((country) => {
        expect([41, 46]).toContain(country.id);
        expect(['Chile', 'Canada']).toContain(country.country);
        expect(['CL', 'CA']).toContain(country.code);
        expect(['CHL', 'CAN']).toContain(country.countryCode);
      });
    }));
});

describe('POST /api/trips', () => {
  const newTrip = {
    authorId: 2,
    summary: 'a great test trip',
    budget: 5000,
    description: 'just read this',
    from: '2022-05-30',
    to: '2022-07-01',
    maxPassengers: 5,
    countries: ['Estonia', 'Poland'],
    activities: ['Hiking', 'Mountains'],
    places: ['Forests', 'Windowm lake'],
    genderRestrictions: 'female',
    video: 'https://www.youtube.com/watch?v=tJk9cFz152s&ab_channel=NationalGeographic',
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
      expect(trip.from.toISOString()).toEqual((new Date(newTrip.from)).toISOString());
      expect(trip.to.toISOString()).toEqual((new Date(newTrip.to)).toISOString());
      expect(trip.maxPassengers).toBe(newTrip.maxPassengers);
      expect(trip.activities).toEqual(expect.arrayContaining(newTrip.activities));
      expect(trip.places).toEqual(expect.arrayContaining(newTrip.places));
      expect(trip.genderRestrictions).toEqual('female');
      expect(trip.video).toEqual('tJk9cFz152s');
      expect(trip.requests).toEqual([]);

      trip.countries.forEach((country) => {
        expect([70, 177]).toContain(country.id);
        expect(['Estonia', 'Poland']).toContain(country.country);
        expect(['EST', 'POL']).toContain(country.countryCode);
        expect(['EE', 'PL']).toContain(country.code);
      });
    }));
});

describe('DELETE /api/trips/:id', () => {
  const trip = {
    authorId: 2,
    description: 'a trip test',
    from: '2022-05-30',
    to: '2022-07-01',
    maxPassengers: 3,
  };

  let tripId;

  beforeAll(async () => {
    const { id } = await createTrip(trip);
    tripId = id;
  });

  test('should delete an existing trip', () => supertest(app)
    .delete(`/api/trips/${tripId}`)
    .expect(200)
    .expect(async (res) => {
      const { status } = res.body;
      expect(status).toBe('success');
      const user = await getTripById(tripId);
      expect(user).toBeNull();
    }));
});
