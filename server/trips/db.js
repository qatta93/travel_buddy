const sql = require('../db');

const getAllTripsDB = async () => {
  const data = await sql`
    SELECT 
    t.id, t.budget, t.summary, t.description, t.from, t.to, t.images, t.max_passengers AS "maxPassengers",
    t.gender_restrictions AS "genderRestrictions", t.video, 
    t.author_id AS "authorId", u.username AS "authorUsername", u.age AS "authorAge", u.gender AS "authorGender", 
    c.country, c.id AS "countryId", c.country_code AS "countryCode", c.code AS "code", a.activity, p.place,
    r.user_id AS "requestUserId", r.id AS "requestId", r.status AS "requestStatus"
    FROM trips AS t
    LEFT JOIN users AS u ON u.id=t.author_id
    LEFT JOIN trips_countries AS tc ON tc.trip_id=t.id
    LEFT JOIN countries AS c ON c.id=tc.country_id
    LEFT JOIN trips_activities AS ta ON ta.trip_id=t.id
    LEFT JOIN activities AS a ON a.id=ta.activity_id
    LEFT JOIN trips_places AS tp ON tp.trip_id=t.id
    LEFT JOIN places AS p ON tp.place_id=p.id
    LEFT JOIN requests AS r ON r.trip_id=t.id
  `;
  return data;
};

const getTripByIdDB = async (id) => {
  const data = await sql`
    SELECT 
    t.id, t.budget, t.summary, t.description, t.from, t.to, t.images, t.max_passengers AS "maxPassengers",
    t.gender_restrictions AS "genderRestrictions", t.video, 
    t.author_id AS "authorId", u.username AS "authorUsername", u.age AS "authorAge", u.gender AS "authorGender", 
    c.country, c.id AS "countryId", c.country_code AS "countryCode", c.code AS "code", a.activity, p.place, 
    r.user_id AS "requestUserId", r.id AS "requestId", r.status AS "requestStatus"
    FROM trips AS t
    JOIN users AS u ON u.id=t.author_id
    LEFT JOIN trips_countries AS tc ON tc.trip_id=t.id
    LEFT JOIN countries AS c ON c.id=tc.country_id
    LEFT JOIN trips_activities AS ta ON ta.trip_id=t.id
    LEFT JOIN activities AS a ON a.id=ta.activity_id
    LEFT JOIN trips_places AS tp ON tp.trip_id=t.id
    LEFT JOIN places AS p ON tp.place_id=p.id
    LEFT JOIN requests AS r ON r.trip_id=t.id
    WHERE t.id = ${id}
  `;
  return data;
};

const createTripDB = async (trip) => {
  const data = await sql`
  INSERT INTO trips ${sql(trip)}
  RETURNING *, gender_restrictions AS "genderRestrictions";
  `;

  return data;
};

const addCountryToTripDB = async (tripId, country) => {
  const data = await sql`
    INSERT INTO trips_countries (trip_id, country_id)
    VALUES (${tripId}, (SELECT id FROM countries WHERE country = ${country}));
  `;
  return data;
};

const addActivityToTripDB = async (tripId, activity) => {
  const data = await sql`
    INSERT INTO trips_activities (trip_id, activity_id)
    VALUES (${tripId}, (SELECT id FROM activities WHERE activity = ${activity}));
  `;
  return data;
};

const createPlaceDB = async (name) => {
  const data = await sql`
    INSERT INTO places (place) VALUES (${name})
    RETURNING *;
  `;
  return data;
};

const getPlaceByNameDB = async (name) => {
  const data = await sql`
    SELECT * FROM places WHERE place = ${name};
  `;
  return data.length > 0 ? data[0] : null;
};

const addPlaceToTripDB = async (tripId, placeId) => {
  const data = await sql`
    INSERT INTO trips_places (trip_id, place_id)
    VALUES (${tripId}, ${placeId});
  `;
  return data;
};

const deleteTripByIdDB = async (id) => {
  const data = await sql`
    DELETE FROM trips WHERE id = ${id}
  `;
  return data;
};

module.exports = {
  getAllTripsDB,
  getTripByIdDB,
  createTripDB,
  deleteTripByIdDB,
  addCountryToTripDB,
  addActivityToTripDB,
  getPlaceByNameDB,
  createPlaceDB,
  addPlaceToTripDB,
};
