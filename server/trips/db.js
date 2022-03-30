const sql = require('../db');

const getAllTripsDB = async () => {
  const data = await sql`
    SELECT 
    t.id, t.author_id AS "authorId", u.username AS "authorUsername", t.budget, t.summary, t.description,
    t.from, t.to, t.images, t.max_passengers AS "maxPassengers", c.country, a.activity, p.place, 
    pa.id AS passenger
    FROM trips AS t
    JOIN users AS u ON u.id=t.author_id
    JOIN trips_countries AS tc ON tc.trip_id=t.id
    JOIN countries AS c ON c.id=tc.country_id
    JOIN trips_activities AS ta ON ta.trip_id=t.id
    JOIN activities AS a ON a.id=ta.activity_id
    JOIN trips_places AS tp ON tp.trip_id=t.id
    JOIN places AS p ON tp.place_id=p.id
    JOIN passengers AS pa ON pa.trip_id=t.id
  `;
  return data;
};

const getTripByIdDB = async (id) => {
  const data = await sql`
    SELECT 
    t.id, t.author_id AS "authorId", u.username AS "authorUsername", t.budget, t.summary, t.description,
    t.from, t.to, t.images, t.max_passengers AS "maxPassengers", c.country, a.activity, p.place, 
    pa.id AS passenger
    FROM trips AS t
    JOIN users AS u ON u.id=t.author_id
    LEFT JOIN trips_countries AS tc ON tc.trip_id=t.id
    LEFT JOIN countries AS c ON c.id=tc.country_id
    LEFT JOIN trips_activities AS ta ON ta.trip_id=t.id
    LEFT JOIN activities AS a ON a.id=ta.activity_id
    LEFT JOIN trips_places AS tp ON tp.trip_id=t.id
    LEFT JOIN places AS p ON tp.place_id=p.id
    LEFT JOIN passengers AS pa ON pa.trip_id=t.id
    WHERE t.id = ${id}
  `;
  return data;
};

const createTripDB = async (trip) => {
  try {
    const data = await sql`
    INSERT INTO trips (author_id, description, max_passengers, "from", "to", summary, budget, images)
    VALUES (${trip.authorId}, ${trip.description}, ${trip.maxPassengers}, ${trip.from}, ${trip.to}, ${trip.summary}, ${trip.budget}, ${trip.images})
    RETURNING *;
    `;

    return data;
  } catch (err) {
    console.error(err, err.message);
    throw err;
  }
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
