const sql = require('../db');

const getAllRequestsDB = async () => {
  const data = await sql`
    SELECT r.*, r.sent_on AS "sentOn", u.id AS "userId", u.username, u.name, u.email FROM requests AS r
    JOIN users AS u ON u.id = r.user_id
  `;
  return data;
};

const getRequestByIdDB = async (id) => {
  const data = await sql`
    SELECT r.*, r.sent_on AS "sentOn", u.id AS "userId", u.username, u.name, u.email FROM requests AS r
    JOIN users AS u ON u.id = r.user_id
    WHERE r.id = ${id}
  `;
  return data;
};

const createRequestDB = async (newTrip) => {
  const data = await sql`
    INSERT INTO requests ${sql(newTrip)} RETURNING *
  `;
  return data;
};

const updateRequestByIdDB = async (id, updatedTrip) => {
  const data = await sql`
    UPDATE requests SET ${sql(updatedTrip)} WHERE id = ${id} RETURNING *
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
