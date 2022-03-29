const sql = require('../db');

const getAllTripsDB = async () => {
  const data = await sql`
    SELECT 
    t.id, t.author_id AS "authorId", u.username AS "authorUsername", t.budget, t.summary, t.description,
    t.images, t.max_passengers AS "maxPassengers", c.country, a.activity, p.place, pa.id AS passenger
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
    t.images, t.max_passengers AS "maxPassengers", c.country, a.activity, p.place, pa.id AS passenger
    FROM trips AS t
    JOIN users AS u ON u.id=t.author_id
    JOIN trips_countries AS tc ON tc.trip_id=t.id
    JOIN countries AS c ON c.id=tc.country_id
    JOIN trips_activities AS ta ON ta.trip_id=t.id
    JOIN activities AS a ON a.id=ta.activity_id
    JOIN trips_places AS tp ON tp.trip_id=t.id
    JOIN places AS p ON tp.place_id=p.id
    JOIN passengers AS pa ON pa.trip_id=t.id
    WHERE t.id = ${id}
  `;
  return data;
};

module.exports = {
  getAllTripsDB,
  getTripByIdDB,
};
