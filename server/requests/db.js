const sql = require('../db');

const getAllRequestsDB = async () => {
  const data = await sql`
    SELECT * FROM requests;
  `;
  return data;
};

const getRequestByIdDB = async (id) => {
  const data = await sql`
    SELECT * FROM requests WHERE id = ${id}
  `;
  return data;
};

const createRequestDB = async (newTrip) => {
  const data = await sql`
    INSERT INTO requests ${sql(newTrip)}
    RETURNING *
  `;
  return data;
};

const updateRequestByIdDB = async (id, updatedTrip) => {
  const data = await sql`
    UPDATE requests SET ${sql(updatedTrip)} WHERE id = ${id}
    RETURNING *
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
