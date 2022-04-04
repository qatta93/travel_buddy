const sql = require('../db');

const getAllRequestsDB = async () => {
  const data = await sql`
    SELECT r.*, r.sent_on AS "sentOn", r.trip_id AS "tripId", 
    u.id AS "userId", u.username, u.name, u.email
    FROM requests AS r
    JOIN users AS u ON u.id = r.user_id
  `;
  return data;
};

const getRequestByIdDB = async (id) => {
  const data = await sql`
    SELECT r.*, r.sent_on AS "sentOn", r.trip_id AS "tripId",
    u.id AS "userId", u.username, u.name, u.email
    FROM requests AS r
    JOIN users AS u ON u.id = r.user_id
    WHERE r.id = ${id}
  `;
  return data;
};

const createRequestDB = async (newRequest) => {
  const data = await sql`
    INSERT INTO requests ${sql(newRequest)}
    RETURNING id, trip_id AS "tripId", user_id AS "userId", message, status, sent_on AS "sentOn"
  `;
  return data;
};

const updateRequestByIdDB = async (id, updatedRequest) => {
  const data = await sql`
    UPDATE requests SET ${sql(updatedRequest)} WHERE id = ${id}
    RETURNING id, trip_id AS "tripId", user_id AS "userId", message, status, sent_on AS "sentOn"
  `;
  return data;
};

const deleteRequestByIdDB = async (id) => {
  const data = await sql`
    DELETE FROM requests WHERE id = ${id}
  `;
  return data;
};

module.exports = {
  getAllRequestsDB,
  getRequestByIdDB,
  createRequestDB,
  deleteRequestByIdDB,
  updateRequestByIdDB,
};
